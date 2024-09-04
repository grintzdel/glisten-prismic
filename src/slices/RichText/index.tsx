import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Bounded from "@/components/Bounded";

/**
 * Props for `RichText`.
 */
export type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="prose prose-invert prose-lg prose-slate">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </Bounded>
  );
};

export default RichText;
