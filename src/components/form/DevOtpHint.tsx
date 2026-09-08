function DevOtpHint({ otp }: { otp?: string }) {
  if (!otp) return null;

  return (
    <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
      Chế độ mock (chưa có BE gửi email): mã OTP của bạn là{" "}
      <span className="font-semibold tracking-widest">{otp}</span>
    </p>
  );
}

export default DevOtpHint;
