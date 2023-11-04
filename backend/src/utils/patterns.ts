/* eslint-disable prettier/prettier */

export const PHONE_PATTERN = '^(7|8)?[-\s]?([489][0-9]{2})[-\s]?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$';

export const EMAIL_PATTERN = '^[\\w.-]+@[\\w-]+\.[\\w-]{2,4}$';

export const STRONG_PASSWORD_PATTENT =
  '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$';
