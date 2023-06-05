import { State } from "..";
import { LoadingStatuses } from "../../constants/loadingStatuses";

export const selectCompetitionsModuleState = (state: State) =>
  state.competition;

export const selectCompetitionIds = (state: State) =>
  selectCompetitionsModuleState(state)?.ids;

export const selectCompetitionEntities = (state: State) =>
  selectCompetitionsModuleState(state)?.entities;

export const selectCompetitionsLoadingStatus = (state: State) =>
  selectCompetitionsModuleState(state)?.status;

export const selectAreCompetitionsLoading = (state: State) =>
  [LoadingStatuses.InProgress, LoadingStatuses.Idle].includes(
    selectCompetitionsLoadingStatus(state)
  );

export const selectCompetitionById = (state: State, competitionId: number) =>
  selectCompetitionEntities(state)[competitionId];
