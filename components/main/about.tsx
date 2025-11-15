import AnimatedText from "@/components/AnimatedText";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Git",
  "Tailwind CSS",
  "Prisma",
  "MongoDB",
  "PostgreSQL",
  "Linux",
];

const About = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full md:w-[45vw] gap-5 mt-8 px-4 md:px-0 pb-10 md:pb-0 ">
        <AnimatedText
          as="p"
          className="text-justify text-sm md:text-base"
          delay={0.04}
        >
          Hey, I'm Akshat — a developer passionate about building impactful
          solutions that enhance convenience and add value through tech and
          code. When I'm not working on projects, you can find me tinkering on X
          (twitter), exploring trends in financial tech (Fintech) and startups.
          I'm dedicated to building products that make a difference.
        </AnimatedText>

        <AnimatedText
          as="div"
          className="flex gap-2 items-center self-start text-sm md:text-base"
          delay={0.12}
        >
          <div>
            <div>
              <img
                src="/nav-svg/arrow_forward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
              />
            </div>
          </div>
          By the way, I'm open to projects and work
        </AnimatedText>

        <div>
          <span></span>
        </div>

        <div className="w-full">
          <AnimatedText as="h3" className="text-sm md:text-base" delay={0.18}>
            Skills &amp; Technologies
          </AnimatedText>

          <div className="flex flex-wrap gap-1 mt-5 text-xs md:text-[12px]">
            {skills.map((s, i) => (
              <AnimatedText
                as="span"
                key={s}
                className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4`}
                delay={0.22 + i * 0.03}
              >
                {s}
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
// This code defines a functional React component named `About` with animated text blocks.
