import { useDispatch, useSelector } from "react-redux";
import {
  selectAreCompetitionsLoading,
  selectCompetitionEntities,
} from "../store/competition/selectors";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store";
import { fetchCompetitions } from "../store/competition";
import competitionCategories from "../constants/competitionCategories";
import CompetitionsList from "../components/CompetitionsList";

const getTimeDifference = (endDate: string) => {
  const targetDate = new Date(endDate);
  const currentDate = new Date();

  const timeDifference = +targetDate - +currentDate;
  return timeDifference;
};

const CompetitionsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleClick = (categoryIndex: number) => {
    setActiveCategory(categoryIndex);
  };

  useEffect(() => {
    dispatch(fetchCompetitions());
  }, [dispatch]);

  const isLoading = useSelector(selectAreCompetitionsLoading);
  const competitions = useSelector(selectCompetitionEntities);

  const sortedCompetitions = Object.values(competitions).filter(
    (competition) => {
      if (activeCategory === 0) {
        if (getTimeDifference(competition.registrationEndDate) < 0 || competition.added) {
          return false;
        }
        return true;
      }
      if (activeCategory === 1) {
        if (competition.added) {
          return true;
        }
        return false;
      }
      if (activeCategory === 2) {
        if (getTimeDifference(competition.registrationEndDate) > 0) {
          return false;
        }
        return true;
      }
      return false;
    }
  );

  return (
    <section>
      <ul className="my-[23px] bg-[#F2F2F2] flex w-max border-[1.5px] border-solid border-[#DADADA] rounded-[8px] p-[4px]">
        {competitionCategories.map((category, index) => (
          <div key={category.id} className="flex w-max">
            <li
              onClick={() => handleClick(index)}
              className={`cursor-pointer tracking-wide font-[600] px-[12px] py-[8px] rounded-[8px]
             transition ease-in-out ${
               activeCategory === index
                 ? "bg-[#09090C] text-white"
                 : "text-[#6C6A6C] hover:bg-[#6C6A6C] hover:text-[#f2f2f2]"
             }`}
            >
              {category.title}
            </li>
            {index !== competitionCategories.length - 1 && (
              <div className="h-10 border-[1.5px] border-solid border-[#DADADA] mx-[4px]"></div>
            )}
          </div>
        ))}
      </ul>
      {isLoading ? (
        "Loading"
      ) : (
        <CompetitionsList
          competitions={sortedCompetitions}
          activeCategory={activeCategory}
        />
      )}
    </section>
  );
};

export default CompetitionsPage;
