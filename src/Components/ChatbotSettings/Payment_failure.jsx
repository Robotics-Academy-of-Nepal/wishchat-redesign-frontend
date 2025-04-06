export default function PaymentFailure() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-4xl font-semibold text-red-600">
        Payment Failed
      </h1>
      <p className="mb-6 text-lg text-gray-800">
        Please contact the Wishchat support team for further assistance.
      </p>
    </div>
  );
}
