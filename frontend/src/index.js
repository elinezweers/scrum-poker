/* eslint-disable require-jsdoc */
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";

Vue.use( Vuex );

Vue.use(
	VueSocketIOExt,
	io( window.location.protocol + "//" + window.location.hostname + ":" + process.env.SOCKET_PORT + "" + window.location.pathname + "pokers",
	{
		reconnection: true,
		reconnectionDelay: 500,
		reconnectionAttempts: 10,
		autoConnect: false
	} ),
);

const store = new Vuex.Store( {
	state: {
		loading: true,
		refinementFinished: false,
		connected: false,
		nickname: "", // Required globally because of socket calls.
		activePoker: false, // Required globally because of socket calls.
		points: {},
		observer: false,
		pointSpread: null,
		currentStory: { name: "", nearestPointAverage: "", voteAverage: "" },
		myVote: "",
		members: { voters: [], observers: [], disconnected: [] },
		votes: [],
		voteCount: 0,
		votedNames: [],
		groupedVoterNames: [],
	},
	mutations: {
		loadingFinished( state ) {
			state.loading = false;
		},
		serverConnection( state, connected ) {
			state.connected = connected;
		},
		refinementFinished( state, finished ) {
			state.refinementFinished = finished;
		},
		activePoker( state, activePoker ) {
			state.activePoker = activePoker;
		},
		pointSpread( state, spread ) {
			state.pointSpread = spread;
		},
		voteCount( state, votes ) {
			state.voteCount = votes;
		},
		members( state, members ) {
			state.members = members;
		},
		observe( state, observer ) {
			state.observer = observer;
		},
		points( state, points ) {
			state.points = points;
		},
		showHistory( state ) {
			state.showHistory = true;
		},
		hideHistory( state ) {
			state.showHistory = false;
		},
		nickname( state, nickname ) {
			state.nickname = nickname;
		},
		currentStory( state, story ) {
			state.currentStory = story;
		},
		votes( state, votes ) {
			state.votes = votes;
		},
		votedNames( state, votedNames ) {
			state.votedNames = votedNames || [];
		},
		groupedVoterNames( state, groupedVoterNames ) {
			state.groupedVoterNames = groupedVoterNames || [];
		},
		myVote( state, vote ) {
			state.myVote = vote;
		},
	},

} );

// eslint-disable-next-line no-new
new Vue( {
	el: "#v-app",
	render: h => h( App ),
	store,
} );