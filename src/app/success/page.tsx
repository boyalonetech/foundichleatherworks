const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-green-100 text-red-800">
      <h1 className="text-3xl font-bold mb-4">Payment Successful 🎉</h1>
      <p className="text-lg mb-4">Thank you for your order!</p>
      <a
        href="/"
        className="mt-4 inline-block px-4 py-2 bg-red-700 text-white rounded-md"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default SuccessPage;
