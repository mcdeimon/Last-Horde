const Loading = () => {
  return (
    <div className="video-responsive">
      <iframe
        frameBorder="0"
        type="text/html"
        src="https://www.youtube.com/embed/XarS8ceJ7_Q?autoplay=1&mute=1&controls=0&loop=1&disablekb=1&fs=0&modestbranding=1&playlist=XarS8ceJ7_Q"
        allow=" clipboard-write; gyroscope;"
        allowFullScreen={true}
        autoPlay={true}
        muted={true}
        title="Loading"
      ></iframe>
      <div className="video-overlay"></div>
    </div>
  );
};

export default Loading;
