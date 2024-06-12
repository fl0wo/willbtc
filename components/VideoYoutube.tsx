
// A one or two sentences testimonial from a customer.
// Highlight the outcome for your customer (how did your product changed her/his life?) or the pain it's removing — Use <span className="bg-warning/25 px-1.5"> to highlight a part of the sentence
const VideoYoutubeTalk = () => {

  const youtubeVideoId = process.env.YOUTUBE_VIDEO_ID;

  if(!youtubeVideoId) {
    return null;
  }

  return (
      <section className="bg-base-200 pb-20 pt-20">
        <div className="px-8 max-w-5xl mx-auto">
          <div className="d-flex-vert">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                  style={{
                    width: "45rem",
                    height: "25rem"
                  }}
                  className="rounded-lg yt-video-width"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
  );
};

export default VideoYoutubeTalk;
