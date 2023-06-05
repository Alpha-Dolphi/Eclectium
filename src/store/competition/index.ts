import { LoadingStatuses } from "../../constants/loadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Competition } from "./competitionInterfaces";
import competitions from "./incomingCompetitionsData";
import { selectCompetitionById, selectCompetitionsLoadingStatus } from "./selectors";
import { State } from "..";

export const fetchCompetitions = createAsyncThunk(
  "competition/fetchCompetitions",
  async (_, { rejectWithValue, getState }) => {
    // if(selectCompetitionsLoadingStatus(getState() as State))
    const { competition } = getState() as State;
    if(competition.ids.length) {
      return competition.entities;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return competitions;
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export const updateCompetitionAdded = createAsyncThunk(
  "competition/updateCompetitionAdded",
  async (competitionId: number, { rejectWithValue, getState }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const state = getState() as State;

      const competition = selectCompetitionById(state, competitionId);

      if (competition) {
        const updatedCompetition = {
          ...competition,
          added: true,
        };

        return updatedCompetition;
      } else {
        throw new Error("Competition not found");
      }
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const competitionEntityAdapter = createEntityAdapter<Competition>();

const initialState = {
  status: LoadingStatuses.Idle,
  entities: {},
  ids: [],
};

export const competitionSlice = createSlice({
  name: "competition",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCompetitions.pending, (state) => {
        state.status = LoadingStatuses.InProgress;
      })
      .addCase(fetchCompetitions.fulfilled, (state, competitions) => {
        competitionEntityAdapter.upsertMany(state, competitions);
        state.status = LoadingStatuses.Success;
      })
      .addCase(fetchCompetitions.rejected, (state) => {
        state.status = LoadingStatuses.Failed;
      })
      .addCase(
        updateCompetitionAdded.fulfilled,
        (state, updatedCompetition) => {
          competitionEntityAdapter.upsertOne(state, updatedCompetition);
        }
      ),
});
