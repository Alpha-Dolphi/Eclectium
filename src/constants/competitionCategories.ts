interface CompetitionCategories {
  id: number;
  title: string;
}

const competitionCategories = [
  {
    id: 11,
    title: "Current Competitions",
  },
  {
    id: 12,
    title: "My competitions",
  },
  {
    id: 13,
    title: "Archive",
  },
] as CompetitionCategories[];

export default competitionCategories;
