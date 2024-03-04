/**
 * Creates a custom error class with the given name.
 *
 * @param {string} name - The name of the custom error.
 * @returns {class} The custom error class.
 */
export const createError = function (name: string) {
  return class CustomError extends Error {
    /**
     * Creates a new custom error.
     *
     * @param {string} message - The error message.
     * @param {string} [code] - An optional error code.
     * @param {bigint} [value] - Optional error value.
     */
    constructor(message: string, public code?: string, public value?: bigint) {
      super(message);
      this.name = name;

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  };
};
