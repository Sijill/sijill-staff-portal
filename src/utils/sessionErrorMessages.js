const ACCOUNT_STATUS_PATTERNS = [
  {
    test: (error) =>
      /pending\s*approval|account\s*pending|awaiting\s*approval/i.test(getErrorText(error)),
    message: 'Your account is pending approval. You will be notified once it has been reviewed.',
  },
  {
    test: (error) => /suspended|deactivated|disabled/i.test(getErrorText(error)),
    message: 'Your account has been suspended. Please contact support for assistance.',
  },
];

const TOKEN_ERROR_PATTERNS = [
  {
    test: (error) => /wrong\s*entity|entity\s*type|not\s*valid\s*for/i.test(getErrorText(error)),
    message: 'This token is not valid for your portal type.',
  },
  {
    test: (error) => /expired/i.test(getErrorText(error)),
    message: 'This token has expired. Ask the patient for a new token.',
  },
  {
    test: (error) => /already\s*used|token\s*used/i.test(getErrorText(error)),
    message: 'This token has already been used.',
  },
  {
    test: (error) => /invalid|not\s*found|incorrect/i.test(getErrorText(error)),
    message: 'Invalid token code. Please check the 6-digit code and try again.',
  },
];

function getErrorText(error) {
  const message = error?.message || '';
  const code = error?.payload?.code || error?.payload?.error || '';
  return `${message} ${code}`.trim();
}

export function getAccountStatusMessage(error) {
  const match = ACCOUNT_STATUS_PATTERNS.find((pattern) => pattern.test(error));
  return match?.message ?? null;
}

export function getTokenErrorMessage(error, fallback = 'Unable to redeem the token.') {
  const accountMessage = getAccountStatusMessage(error);
  if (accountMessage) {
    return accountMessage;
  }

  const match = TOKEN_ERROR_PATTERNS.find((pattern) => pattern.test(error));
  return match?.message ?? error?.message ?? fallback;
}

export function getLoginErrorMessage(error) {
  return getAccountStatusMessage(error) ?? error?.message ?? 'Login failed. Please try again.';
}
