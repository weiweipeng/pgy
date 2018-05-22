import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    tabListShow: true,
    authentication: false,
    proposalDetail: null,
    proposalSuccess: false,
    url: null
}
const mutations={
    tabListHide: function(state){
        state.tabListShow = false;
    },
    tabListShow: function(state){
        state.tabListShow = true;
    },
    authenticationFail: function(state){
        state.authentication = false;
    },
    authenticationSuccess: function(state){
        state.authentication = true;
    },
    forProposalData: function(state, data){
        state.proposalDetail = data;
    },
    submitProposalSuccess: function(state){
    	state.proposalSuccess = true;
    },
    reductionProposal: function(state){
    	state.proposalSuccess = false;
    },
    setUrl: function(state, newURL){
    	state.url = newURL;
    }
}


export default new Vuex.Store({
    state,mutations
});
