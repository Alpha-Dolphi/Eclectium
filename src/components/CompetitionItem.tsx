import { Competition } from "../store/competition/competitionInterfaces";
import dollarIcon from "../icons/dollar.svg";
import peopleIcon from "../icons/people.svg";
import starsIcon from "../icons/stars.svg";
import starIcon from "../icons/star.svg";
import flagIcon from "../icons/flag.svg";
import { useDispatch } from "react-redux";
import { updateCompetitionAdded } from "../store/competition/index";
import { AppDispatch } from "../store";

interface CompetitionItemProps {
  competition: Competition;
  activeCategory: number;
}

const CompetitionItem = ({
  competition,
  activeCategory,
}: CompetitionItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  const targetDate = new Date(competition.registrationEndDate);
  const currentDate = new Date();

  const timeDifference = +targetDate - +currentDate;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

  const participate = () => {
    const competitionId = competition.id;
    dispatch(updateCompetitionAdded(competitionId));
  };

  return (
    <>
      <div className="w-full pl-[25px] px-[25px] pb-[24px] pt-[48px] grid grid-flow-col gap-10 grid-position">
        <div className="grid">
          <span className="font-[600] text-[40px] leading-[140%]">
            {competition.name}
          </span>
          <span className="font-[700] text-[20px] leading-[150%]">
            {competition.startingDate}
          </span>
        </div>

        <div>
          <span className="font-normal text-sm leading-tight overflow-hidden h-17 line-clamp-4 pt-4">
            {competition.description}
          </span>

          <div className="flex content-between gap-[16px] mt-[28px]">
            <div className="bg-[#F2F2F2] text-[#09090C] py-[4px] px-[16px] flex gap-[8px] align-middle w-max rounded-[16px]">
              <img src={`${dollarIcon}`} alt="dollar icon" />
              <span>
                Price: {competition.price} {competition.currencySymbol}
              </span>
            </div>
            <div className="bg-[#F2F2F2] text-[#09090C] py-[4px] px-[16px] flex gap-[8px] align-middle w-max rounded-[16px]">
              <img src={`${peopleIcon}`} alt="people icon" />
              <span>{competition.participants} participants enrolled</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] align-center">
          {activeCategory === 0 && (
            <>
              <span className="text-[#6C6A6C] text-[24px] font-[600]">
                Registration ends in
              </span>
              <div className="flex gap-[12.5px]">
                <div className="square-time">
                  <span className="square-number">{days}</span>
                  <span>Days</span>
                </div>
                <div className="square-time">
                  <span className="square-number">{hours}</span>
                  <span>Hours</span>
                </div>
                <div className="square-time">
                  <span className="square-number">{minutes}</span>
                  <span>Minutes</span>
                </div>
              </div>
              <button
                onClick={participate}
                className="w-[250px] bg-[#09090C] rounded-[8px] text-center py-[9px] text-white mt-[10px]"
              >
                Participate
              </button>
            </>
          )}

          {activeCategory === 1 && (
            <>
              <div className="w-[275px] h-[150px] border-[1.5px] border-solid border-[#DADADA] text-[#09090C] rounded-[24px] text-[24px] font-[600] p-[22px] flex items-end relative">
                <div className="grid">
                  <span className="h-fit">You are </span>
                  <span className="h-fit mb-1">participant!</span>
                </div>
                <img
                  className="absolute top-[19.6px] left-[115px]"
                  src={`${starsIcon}`}
                  alt="stars icon"
                />
                <img
                  className="absolute top-[34.6px] left-[192.5px]"
                  src={`${starsIcon}`}
                  alt="stars icon"
                />
                <img
                  className="absolute top-[96.9px] left-[179px]"
                  src={`${starIcon}`}
                  alt="stars icon"
                />
              </div>
            </>
          )}

          {activeCategory === 2 && (
            <>
              <div className="w-[275px] h-[150px] border-[1.5px] border-solid border-[#DADADA] text-[#09090C] rounded-[24px] text-[24px] font-[600] p-[22px] flex relative flex-col">
                <span>This competition </span>
                <span>is over</span>
                <img
                  className="absolute top-[80.8px] left-[190.8px]"
                  src={`${flagIcon}`}
                  alt="flag icon"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CompetitionItem;
