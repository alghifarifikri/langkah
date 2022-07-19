import {combineReducers} from 'redux';
import REF_Nationality from './REF_Nationality';
import REF_Province from './REF_Province';
import REF_Identity from './REF_Identity';
import REF_City from './REF_City';
import REF_District from './REF_District';
import REF_SubDistrict from './REF_SubDistrict';
import Register from './Register';
import Profile from './Profile';
import Journey from './Journey';
import DetailJourney from './DetailJourney';
import Likes from './Likes';
import Comment from './Comment';
import SubmitComment from './SubmitComment';
import Request from './Request';
import Notification from './Notification';
import Follow from './Follow';
import Followers from './Followers';
import MilesStone from './MilesStone';
import Event from './Event';
import REF_Distance from './REF_Distance';
import REF_Category from './REF_Category';
import REF_Option from './REF_Option';
import REF_Question from './REF_Question';
import REF_AddOns from './REF_AddOns';
import Payment from './Payment';
import REF_Jersey from './REF_Jersey';
import CekEmail from './CekEmail';

const reducers = combineReducers({
  REF_Nationality,
  REF_Province,
  REF_Identity,
  REF_City,
  REF_District,
  REF_SubDistrict,
  Register,
  Profile,
  Journey,
  DetailJourney,
  Likes,
  Comment,
  SubmitComment,
  Request,
  Notification,
  Follow,
  Followers,
  MilesStone,
  Event,
  REF_Distance,
  REF_Category,
  REF_Option,
  REF_Question,
  REF_AddOns,
  Payment,
  CekEmail,
  REF_Jersey,
});

export default reducers;
