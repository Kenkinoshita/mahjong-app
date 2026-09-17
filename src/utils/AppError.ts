/** アプリケーション内で発生したエラー。元のエラーは cause に保持できます。 */
export class AppError extends Error {
  constructor(message = '予期しないエラーが発生しました。', options?: ErrorOptions) {
    super(message, options);
    this.name = 'AppError';
  }
}
