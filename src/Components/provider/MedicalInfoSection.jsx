import React from 'react';
import { Col, Row } from 'react-bootstrap';

const toneStyles = {
  teal: {
    background: 'linear-gradient(180deg, #bcf6f8 0%, #c9fbfb 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#31575b',
    shadow: '0 12px 24px rgba(65, 219, 224, 0.16)',
  },
  danger: {
    background: 'linear-gradient(180deg, #cf6d6d 0%, #e08b8b 100%)',
    title: '#fff7f7',
    text: '#fff7f7',
    note: '#fff7f7',
    meta: '#fff7f7',
    shadow: '0 12px 24px rgba(176, 63, 63, 0.16)',
  },
  rose: {
    background: 'linear-gradient(180deg, #fff3f3 0%, #fff7f7 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#b12b2b',
    shadow: '0 10px 20px rgba(188, 84, 84, 0.08)',
  },
  sand: {
    background: 'linear-gradient(180deg, #fff6df 0%, #fffaf0 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#995d1d',
    shadow: '0 10px 20px rgba(181, 140, 64, 0.08)',
  },
  mint: {
    background: 'linear-gradient(180deg, #eefcf2 0%, #f6fff6 100%)',
    title: '#143438',
    text: '#31575b',
    note: '#4e7175',
    meta: '#389b50',
    shadow: '0 10px 20px rgba(68, 153, 90, 0.08)',
  },
};

const MedicalInfoSection = ({ title, icon, items }) => {
  const IconComponent = icon;

  return (
    <section className="py-4" style={{ borderBottom: '1px solid rgba(22, 52, 55, 0.12)' }}>
      <div className="d-flex align-items-center gap-2 mb-3" style={{ color: '#295c62' }}>
        <IconComponent size={19} strokeWidth={2.1} />
        <h2
          className="mb-0"
          style={{
            fontSize: '1.05rem',
            color: '#31363b',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>
      </div>

      <Row className="g-3 ps-md-4">
        {items.map((item, index) => {
          const tone = toneStyles[item.tone] ?? toneStyles.teal;

          return (
            <Col key={`${title}-${item.title}-${index}`} xs={12} md={6}>
              <article
                className="rounded-3 h-100 px-3 py-3"
                style={{
                  minHeight: '88px',
                  background: tone.background,
                  boxShadow: tone.shadow,
                }}
              >
                <div className="d-flex align-items-baseline justify-content-between gap-3 mb-2">
                  <h3
                    className="mb-0"
                    style={{
                      fontSize: '0.98rem',
                      color: tone.title,
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.meta ? (
                    <span
                      className="text-uppercase"
                      style={{
                        fontSize: '0.72rem',
                        color: tone.meta,
                        fontWeight: 800,
                      }}
                    >
                      {item.meta}
                    </span>
                  ) : null}
                </div>

                <p
                  className="mb-1"
                  style={{
                    fontSize: '0.8rem',
                    color: tone.text,
                    fontWeight: 600,
                  }}
                >
                  {item.subtitle}
                </p>
                <small
                  style={{
                    fontSize: '0.72rem',
                    color: tone.note,
                    fontWeight: 700,
                  }}
                >
                  {item.note}
                </small>
              </article>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default MedicalInfoSection;
