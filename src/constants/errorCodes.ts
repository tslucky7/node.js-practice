type ErrorCodeValue = {
  code: string;
  message: string;
};

export const ERROR_CODES = {
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'バリデーションエラーです。',
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: 'ユーザーが見つかりませんでした。',
  },
  PRODUCT_NOT_FOUND: {
    code: 'PRODUCT_NOT_FOUND',
    message: '商品が見つかりませんでした。',
  },
} as const satisfies Record<string, ErrorCodeValue>;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
