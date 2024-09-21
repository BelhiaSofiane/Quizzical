import '../index.css'; // This is where the spinner styles will go

function Loading() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
