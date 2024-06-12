import Image from "next/image";

// A one or two sentences testimonial from a customer.
// Highlight the outcome for your customer (how did your product changed her/his life?) or the pain it's removing — Use <span className="bg-warning/25 px-1.5"> to highlight a part of the sentence
const Testimonial1Small = () => {
  return (
      <section className="bg-base-100">
        <div className="space-y-6 md:space-y-8 max-w-lg mx-auto px-8 py-16 md:py-32 pt-3-forced pb-3-forced">
          <div className="rating !flex justify-center">
            {[...Array(5)].map((_, i) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-warning"
                    key={i}
                >
                  <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                  />
                </svg>
            ))}
          </div>
          <div className="text-base leading-relaxed space-y-2 max-w-md mx-auto text-center">
            {/*<p>*/}
            {/*  <span className="bg-warning/25 px-1.5">*/}
            {/*    I don&apos;t have time publish content on trending keywords.*/}
            {/*  </span>{" "}*/}
            {/*  I don&apos;t have money to pay for useless ads.*/}
            {/*</p>*/}
            <p>
              <strong>+247</strong> people have piece of mind with WillBTC.
            </p>
          </div>
            <div className="flex justify-center items-center gap-3 md:gap-4">
                <Image
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    src="/images/mattia-pp.png"
                    alt={`XYZ feedback for ZenVoice`}
                    width={48}
                    height={48}
                />
                <div>
                    <p className="font-semibold">Mattia Assanelli</p>
                    <p className="text-base-content/80 text-sm">
                        Premium Italian Meat Distribution Company
                    </p>
                </div>

                <a href="https://www.producthunt.com/posts/blogfast?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-blogfast"
                   target="_blank"><img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=457262&theme=light"
                    alt="BlogFAST - Auto&#0045;blog&#0032;generator&#0032;with&#0032;hosting&#0032;aimed&#0032;to&#0032;grow&#0032;leads&#0046; | Product Hunt"
                    style={
                        {
                            width: "250px",
                            height: "54px",
                        }
                    }
                    width="250" height="54"/></a>
            </div>

        </div>

      </section>
  );
};

export default Testimonial1Small;
