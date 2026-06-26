import { formatDate, formatDateTime, formatEnumLabel } from '../constants/medicalConstants';

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN_X = 44;
const TOP_MARGIN = 42;
const BOTTOM_MARGIN = 34;
const SIGNATURE_RESERVED_HEIGHT = 110;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const FONT_REGULAR = '/Times-Roman';
const FONT_BOLD = '/Times-Bold';
const FONT_ITALIC = '/Times-Italic';

function encodePdfText(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\r/g, '');
}

function sanitizeFileName(value) {
  return String(value ?? 'encounter-summary')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'encounter-summary';
}

function estimateTextWidth(text, size) {
  return String(text ?? '').length * size * 0.52;
}

function wrapText(text, maxWidth, size) {
  const source = String(text ?? '').trim();
  if (!source) {
    return [''];
  }

  const maxChars = Math.max(18, Math.floor(maxWidth / (size * 0.52)));
  const lines = [];

  for (const paragraph of source.split(/\n+/)) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push('');
      continue;
    }

    let currentLine = words[0];
    for (let index = 1; index < words.length; index += 1) {
      const word = words[index];
      if ((currentLine + ' ' + word).length <= maxChars) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    lines.push(currentLine);
  }

  return lines;
}

function createPdfBuilder() {
  const pages = [];
  let currentPage = null;

  function startPage() {
    currentPage = {
      commands: [],
      cursorY: PAGE_HEIGHT - TOP_MARGIN,
    };
    pages.push(currentPage);
  }

  function addCommand(command) {
    currentPage.commands.push(command);
  }

  function addLine(x1, y, x2, thickness = 0.8) {
    addCommand(`0 0 0 RG ${thickness} w ${x1} ${y} m ${x2} ${y} l S`);
  }

  function drawText(text, { x, y, size = 10.5, font = FONT_REGULAR, color = [0, 0, 0], align = 'left' }) {
    const width = estimateTextWidth(text, size);
    let drawX = x;

    if (align === 'center') {
      drawX = x - width / 2;
    } else if (align === 'right') {
      drawX = x - width;
    }

    addCommand(
      `BT ${font} ${size} Tf ${color[0] / 255} ${color[1] / 255} ${color[2] / 255} rg 1 0 0 1 ${drawX} ${y} Tm (${encodePdfText(text)}) Tj ET`
    );
  }

  function ensureSpace(requiredHeight) {
    if (!currentPage) {
      startPage();
      return;
    }

    if (currentPage.cursorY - requiredHeight < BOTTOM_MARGIN + SIGNATURE_RESERVED_HEIGHT) {
      startPage();
    }
  }

  function drawCenteredTitle(title) {
    ensureSpace(42);
    drawText(title, {
      x: PAGE_WIDTH / 2,
      y: currentPage.cursorY - 4,
      size: 24,
      font: FONT_BOLD,
      align: 'center',
    });
    currentPage.cursorY -= 20;
    addLine(MARGIN_X, currentPage.cursorY, PAGE_WIDTH - MARGIN_X, 1.05);
    currentPage.cursorY -= 16;
  }

  function drawSectionTitle(title) {
    ensureSpace(26);
    addLine(MARGIN_X, currentPage.cursorY, PAGE_WIDTH - MARGIN_X, 0.85);
    currentPage.cursorY -= 14;
    drawText(title.toUpperCase(), {
      x: MARGIN_X,
      y: currentPage.cursorY,
      size: 13,
      font: FONT_BOLD,
    });
    currentPage.cursorY -= 16;
  }

  function drawLabelValueRow(label, value) {
    const labelX = MARGIN_X + 4;
    const valueX = MARGIN_X + 118;
    const maxValueWidth = PAGE_WIDTH - MARGIN_X - valueX;
    const lines = wrapText(value, maxValueWidth, 10.3);
    const rowHeight = Math.max(14, lines.length * 12.5);
    ensureSpace(rowHeight + 2);

    drawText(label, {
      x: labelX,
      y: currentPage.cursorY,
      size: 10.2,
      font: FONT_BOLD,
      color: [35, 35, 35],
    });

    let first = true;
    for (const line of lines) {
      if (!first) {
        currentPage.cursorY -= 12.5;
      }
      drawText(line, {
        x: valueX,
        y: currentPage.cursorY,
        size: 10.3,
        font: FONT_REGULAR,
        color: [0, 0, 0],
      });
      first = false;
    }

    currentPage.cursorY -= 14;
  }

  function drawParagraph(title, text, options = {}) {
    drawSectionTitle(title);

    const lines = wrapText(text, CONTENT_WIDTH - 24, 10.3);
    const lineHeight = options.lineHeight ?? 14;
    ensureSpace(lines.length * lineHeight + 2);

    for (const line of lines) {
      drawText(line, {
        x: MARGIN_X + 4,
        y: currentPage.cursorY,
        size: 10.3,
        font: FONT_REGULAR,
      });
      currentPage.cursorY -= lineHeight;
    }

    currentPage.cursorY -= 2;
  }

  function drawList(title, items, emptyMessage = 'No records available.') {
    drawSectionTitle(title);

    if (!items.length) {
      drawText(emptyMessage, {
        x: MARGIN_X + 4,
        y: currentPage.cursorY,
        size: 10.3,
        font: FONT_ITALIC,
        color: [70, 70, 70],
      });
      currentPage.cursorY -= 16;
      return;
    }

    for (const item of items) {
      const lines = wrapText(item, CONTENT_WIDTH - 30, 10.1);
      ensureSpace(lines.length * 13 + 6);
      drawText('-', {
        x: MARGIN_X + 6,
        y: currentPage.cursorY,
        size: 11,
        font: FONT_BOLD,
      });

      let first = true;
      for (const line of lines) {
        drawText(line, {
          x: MARGIN_X + 18,
          y: currentPage.cursorY,
          size: 10.1,
          font: FONT_REGULAR,
        });
        if (first) {
          first = false;
        }
        currentPage.cursorY -= 12.5;
      }
      currentPage.cursorY -= 5;
    }
  }

  function drawOrderSection(order, index) {
    const isLab = order.orderType === 'LABORATORY';
    const sectionTitle = `${isLab ? 'Lab' : 'Imaging'} Order ${index + 1}`;

    drawSectionTitle(sectionTitle);
    drawLabelValueRow('Type', isLab ? order.labOrder?.testType || 'Not provided' : order.imagingOrder?.imagingType || 'Not provided');
    drawLabelValueRow('Status', formatEnumLabel(order.orderStatus));
    drawLabelValueRow('Ordered at', formatDateTime(order.orderedAt));
    drawLabelValueRow('Priority', isLab ? formatEnumLabel(order.labOrder?.priority) : formatEnumLabel(order.imagingOrder?.priority));

    if (isLab) {
      if (order.labOrder?.specimenType) {
        drawLabelValueRow('Specimen', formatEnumLabel(order.labOrder.specimenType));
      }
      drawLabelValueRow('Fasting', order.labOrder?.fastingRequired ? 'Yes' : 'No');
      if (order.labOrder?.clinicalIndication) {
        drawLabelValueRow('Indication', order.labOrder.clinicalIndication);
      }

      const result = order.labOrder?.result;
      if (result) {
        drawLabelValueRow('Result notes', result.additionalNotes || 'None');
        drawLabelValueRow('Reported at', formatDateTime(result.uploadedAt));

        if (result.resultData?.overallImpression) {
          drawLabelValueRow('Impression', result.resultData.overallImpression);
        }

        if (Array.isArray(result.resultData?.results) && result.resultData.results.length) {
          drawParagraph(
            'Measured values',
            result.resultData.results
              .map((item) => `${item.name}: ${item.value}${item.unit ? ` ${item.unit}` : ''}${item.referenceRange ? ` (ref ${item.referenceRange})` : ''}`)
              .join('\n')
          );
        }
      }
    } else {
      if (order.imagingOrder?.bodyPart) {
        drawLabelValueRow('Body part', formatEnumLabel(order.imagingOrder.bodyPart));
      }
      drawLabelValueRow('Contrast', order.imagingOrder?.contrastUsed ? 'Used' : 'Not used');
      if (order.imagingOrder?.clinicalIndication) {
        drawLabelValueRow('Indication', order.imagingOrder.clinicalIndication);
      }

      const result = order.imagingOrder?.result;
      if (result) {
        drawLabelValueRow('Study', result.studyDescription || 'Not provided');
        drawParagraph('Findings', result.findings || 'Not provided');
        drawLabelValueRow('Reported at', formatDateTime(result.uploadedAt));
      }
    }
  }

  function drawSignatureBlock(doctorName) {
    if (currentPage.cursorY < 180) {
      startPage();
    }

    const signatureWidth = 184;
    const signatureX = PAGE_WIDTH - MARGIN_X - signatureWidth;
    const baselineY = BOTTOM_MARGIN + 62;

    addLine(signatureX, baselineY, signatureX + signatureWidth, 0.95);
    drawText(doctorName || 'Physician Name', {
      x: signatureX + signatureWidth / 2,
      y: baselineY - 22,
      size: 11.5,
      font: FONT_BOLD,
      align: 'center',
    });
  }

  function addFooter(pageNumber) {
    drawText(`Page ${pageNumber}`, {
      x: PAGE_WIDTH - MARGIN_X,
      y: BOTTOM_MARGIN - 2,
      size: 8.3,
      font: FONT_REGULAR,
      align: 'right',
    });
  }

  function finalize() {
    const catalogObjectNumber = 1;
    const pagesObjectNumber = 2;
    const regularFontObjectNumber = 3;
    const boldFontObjectNumber = 4;
    const italicFontObjectNumber = 5;

    const pageObjects = [];
    const contentObjects = [];
    const objects = [];

    pages.forEach((page) => {
      addFooterToPage(page);
    });

    let nextObjectNumber = 6;
    pages.forEach(() => {
      pageObjects.push(nextObjectNumber++);
      contentObjects.push(nextObjectNumber++);
    });

    objects.push(`${catalogObjectNumber} 0 obj << /Type /Catalog /Pages ${pagesObjectNumber} 0 R >> endobj`);
    objects.push(`${pagesObjectNumber} 0 obj << /Type /Pages /Kids [${pageObjects.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageObjects.length} >> endobj`);
    objects.push(`${regularFontObjectNumber} 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >> endobj`);
    objects.push(`${boldFontObjectNumber} 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >> endobj`);
    objects.push(`${italicFontObjectNumber} 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >> endobj`);

    const pageContentStrings = pages.map((page) => page.commands.join('\n'));
    const contentLengths = pageContentStrings.map((content) => content.length);

    pageObjects.forEach((pageObjectNumber, index) => {
      const contentObjectNumber = contentObjects[index];
      const contentStream = pageContentStrings[index];
      objects.push(
        `${pageObjectNumber} 0 obj << /Type /Page /Parent ${pagesObjectNumber} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${regularFontObjectNumber} 0 R /F2 ${boldFontObjectNumber} 0 R /F3 ${italicFontObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >> endobj`
      );
      objects.push(`${contentObjectNumber} 0 obj << /Length ${contentLengths[index]} >> stream\n${contentStream}\nendstream endobj`);
    });

    const pdfParts = ['%PDF-1.4\n'];
    const offsets = [0];
    let currentLength = pdfParts[0].length;

    for (const object of objects) {
      offsets.push(currentLength);
      pdfParts.push(`${object}\n`);
      currentLength += `${object}\n`.length;
    }

    const xrefStart = currentLength;
    let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let index = 1; index < offsets.length; index += 1) {
      xref += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
    }
    const trailer = `trailer << /Size ${objects.length + 1} /Root ${catalogObjectNumber} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
    pdfParts.push(xref, trailer);

    return new Blob(pdfParts, { type: 'application/pdf' });
  }

  function addFooterToPage(page) {
    const previousPage = currentPage;
    currentPage = page;
    addFooter(pages.indexOf(page) + 1);
    currentPage = previousPage;
  }

  function build({ patientName, doctorName, encounter, recordedAt, encounterId }) {
    startPage();

    drawCenteredTitle('Encounter Record');

    drawText(`Patient: ${patientName || 'Not provided'}`, {
      x: MARGIN_X,
      y: currentPage.cursorY,
      size: 11.2,
      font: FONT_BOLD,
    });
    currentPage.cursorY -= 14;

    drawText(`Doctor: ${doctorName || 'Not provided'}`, {
      x: MARGIN_X,
      y: currentPage.cursorY,
      size: 11.2,
      font: FONT_BOLD,
    });
    currentPage.cursorY -= 14;

    drawText(`Encounter ID: ${encounterId || 'Not provided'}`, {
      x: MARGIN_X,
      y: currentPage.cursorY,
      size: 10,
      font: FONT_REGULAR,
    });
    currentPage.cursorY -= 14;

    drawText(`Recorded on: ${formatDateTime(recordedAt)}`, {
      x: MARGIN_X,
      y: currentPage.cursorY,
      size: 10,
      font: FONT_REGULAR,
    });
    currentPage.cursorY -= 10;

    drawSectionTitle('Encounter Details');
    drawLabelValueRow('When', formatDateTime(encounter?.encounterDate));
    drawLabelValueRow('Where', encounter?.locationAddress || 'Location not provided');
    drawLabelValueRow('Specialty', encounter?.hcpSpecialization || 'Not provided');

    drawList(
      'Symptoms',
      (encounter?.symptoms ?? []).length
        ? encounter.symptoms.map((item) => `${item.title}${item.description ? ` - ${item.description}` : ''}`)
        : [],
      'No symptoms recorded.'
    );

    drawList(
      'Diagnoses',
      (encounter?.diagnoses ?? []).length
        ? encounter.diagnoses.map((item) => `${item.icd11Title || 'Diagnosis'} (${item.icd11Code || 'N/A'})${item.clinicalDescription ? ` - ${item.clinicalDescription}` : ''}`)
        : [],
      'No diagnoses recorded.'
    );

    drawList(
      'Medications',
      (encounter?.medications ?? []).length
        ? encounter.medications.map((item) => {
            const dosage = item.dosageAmount ? `${item.dosageAmount} ${item.dosageUnit || ''}`.trim() : 'Dose not provided';
            const schedule = `${formatDate(item.startDate)}${item.endDate ? ` to ${formatDate(item.endDate)}` : ''}`;
            const instructions = item.instructions ? `Instructions: ${item.instructions}` : '';
            return [item.medicationName || 'Medication', dosage, item.form, item.frequency, schedule, instructions].filter(Boolean).join(' | ');
          })
        : [],
      'No medications prescribed.'
    );

    drawSectionTitle('Medical Orders');
    if ((encounter?.orders ?? []).length) {
      encounter.orders.forEach((order, index) => {
        drawOrderSection(order, index);
      });
    } else {
      drawText('No medical orders were recorded for this encounter.', {
        x: MARGIN_X + 4,
        y: currentPage.cursorY,
        size: 10.3,
        font: FONT_ITALIC,
        color: [70, 70, 70],
      });
      currentPage.cursorY -= 16;
    }

    drawSignatureBlock(doctorName || encounter?.hcpFullName || 'Physician Name');

    return finalize();
  }

  return { build };
}

export function downloadEncounterSummaryPdf({ encounter, patientName, doctorName, recordedAt, encounterId }) {
  const builder = createPdfBuilder();
  const blob = builder.build({ patientName, doctorName, encounter, recordedAt, encounterId });
  const fileName = `encounter-summary-${sanitizeFileName(patientName)}-${sanitizeFileName(encounter?.encounterDate || recordedAt)}.pdf`;

  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
