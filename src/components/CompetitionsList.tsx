import { Competition } from "../store/competition/competitionInterfaces";
import CompetitionItem from "./CompetitionItem";

interface CompetitionsListProps {
  competitions: {
    [id: number]: Competition;
  };
  activeCategory: number;
}

const CompetitionsList = ({
  competitions,
  activeCategory,
}: CompetitionsListProps) => {
  const compets = Object.values(competitions);

  return (
    <ul
      className="w-full h-max rounded-[24px] border-[1.5px] border-solid border-[#DADADA]
        py-[15px] px-[9px] grid gap-[20px]"
    >
      {compets.map((competition, index) => (
        <div key={competition.id}>
          <li>
            {
              <CompetitionItem
                competition={competition}
                activeCategory={activeCategory}
              />
            }
          </li>
          {index !== compets.length - 1 && (
            <div className="border-[1.5px] border-solid border-[#DADADA] px-[4px] w-full"></div>
          )}
        </div>
      ))}
    </ul>
  );
};

export default CompetitionsList;
