import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import Bounded from "@/components/Bounded";
import { RichTextField } from "@prismicio/types";

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies = async ({ slice }: CaseStudiesProps): Promise<JSX.Element> => {

  const client = createClient();

  const caseStudies = await Promise.all(
    slice.primary.case_study.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study_relation)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study_relation.id
        );
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >

      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
        <PrismicText field={slice.primary.heading as RichTextField} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-20 grid gap-16">
        {caseStudies.map((caseStudy, index) => (
          caseStudy && (
            <div key={caseStudy.id}
                 className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <div className="flex col-psan-1 flex-col justify-center gap-4">
                <h3 className="text-4xl">
                  <PrismicText field={caseStudy.data.company as RichTextField} />
                </h3>

                <div className="max-w-md">
                  <PrismicRichText field={caseStudy.data.description} />
                </div>

                <PrismicNextLink document={caseStudy} className="after:absolute after:inset-0 hover:underline">
                  Read <PrismicText field={caseStudy.data.company as RichTextField} /> case study
                </PrismicNextLink>
              </div>

              <PrismicNextImage field={caseStudy.data.logo_image} quality={100}
                                className={clsx("rounded-xl lg:col-span-2", index % 2 && "-order-1")} />

            </div>
          )
        ))}
      </div>
    </Bounded>
  );
};

export default CaseStudies;
