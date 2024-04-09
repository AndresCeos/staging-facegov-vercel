import Share from '@/components/Share';

type PoliticalFigureShareProps = {
  politicalFigure: Api.PoliticalFigure;
};

function PoliticalFigureShare({ politicalFigure }: PoliticalFigureShareProps) {
  return (
    <div className="text-center flex mx-auto justify-center items-center gap-5 pt-10">
      <div className="text-2xl font-light">
        Comparte este
        <br />
        político
      </div>
      <Share
        iconClassName="text-4xl"
        className="text-2xl font-light cursor-pointer"
        politicalFigure={politicalFigure}
      />
    </div>
  );
}

export default PoliticalFigureShare;
