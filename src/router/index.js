import Vue from 'vue'
import Router from 'vue-router'
//主页面
import index from '../components/index/index'
import train from '../components/train/train'
import train1 from '../components/train/train1'
import activity from '../components/activity/activity'
import organiza from '../components/organiza/organiza'
import my from '../components/my/my'
//子页面
import articleDetail from '../components/article-detail/article-detail'
import article from '../components/article-detail/article'
import meetingDetail from '../components/article-detail/meeting-detail'
import organizaDetail from '../components/organiza/organiza-detail'
import orgMettingList from '../components/organiza/org-metting-list'
import threeM_oneC from '../components/threeMeeting-oneClass/threeMeeting-oneClass'
import branchLife from '../components/branch-life/branch-life'
import study from '../components/study/study'
import studyDetail from '../components/study/study-detail'
import eassyInfo from '../components/study/eassy-info'
import submission from '../components/study/submission'
import proposal from '../components/proposal/proposal'
import proposalDetail from '../components/proposal/proposal-detail'
import releaseProposal from '../components/proposal/release-proposal'

import partyData from '../components/party-data/party-data'
import rank from '../components/party-data/rank'
import personRank from '../components/party-data/person-rank'
import personData from '../components/party-data/person-data'
import scheduleRecord from '../components/party-data/schedule-record'
import partyRank from '../components/party-data/party-rank'

import publicWelfare from '../components/public-welfare/public-welfare'
import loveDonation from '../components/love-donation/love-donation'
import donationDetail from '../components/love-donation/donation-detail'
import questionnaireInvestigation from '../components/questionnaire-investigation/questionnaire-investigation'
import vote from '../components/questionnaire-investigation/vote'
import membershipDues from '../components/my/membership-dues'
import schedule from '../components/my/schedule'
import myEssay from '../components/my/my-essay'
import myCollection from '../components/my/my-collection'
import myNews from '../components/my/my-news'
import myInformation from '../components/my/my-information'
import myProposal from '../components/my/my-proposal'
import partyPortrait from '../components/my/party-portrait'

import actList from '../components/activity/act-list'
import mienList from '../components/activity/mien-list'
import proposalOld from '../components/proposal/proposal-old'


Vue.use(Router)

let router = new Router({
	'linkActiveClass': 'active',
  	routes: [
	  	{
	      	path: '/',
	      	redirect: 'index'
	   },
	   {
	   		name: 'index',
	      	path: '/index',
	      	component: index
	    },
	    {
	    	name: 'train',
	      	path: '/train',
	      	component: train,
	    },
	    {
	    	name: 'train1',
	      	path: '/train1',
	      	component: train1,
	    },
	    {
	    	name: 'activity',
	      	path: '/activity',
	      	component: activity
	    },
	    {
	    	name: 'organiza',
	      	path: '/organiza',
	      	component: organiza
	    },
	    {
	    	name: 'my',
	      	path: '/my',
	      	component: my
	    },
	    {
	    	name: 'articleDetail',
	      	path: '/articleDetail',
	      	component: articleDetail
	    },
	    {
	    	name: 'article',
	      	path: '/article',
	      	component: article
	    },
	    {
	    	name: 'meetingDetail',
	      	path: '/meetingDetail',
	      	component: meetingDetail
	    },
	    {
	    	name: 'organizaDetail',
	      	path: '/organizaDetail',
	      	component: organizaDetail
	    },
	    {
	    	name: 'orgMettingList',
	      	path: '/orgMettingList',
	      	component: orgMettingList
	    },
	    {
	    	name: 'threeM_oneC',
	      	path: '/threeM_oneC',
	      	component: threeM_oneC
	    },
	    {
	    	name: 'branchLife',
	      	path: '/branchLife',
	      	component: branchLife
	    },
	    {
	    	name: 'study',
	      	path: '/study',
	      	component: study
	    },
	    {
	    	name: 'studyDetail',
	      	path: '/studyDetail',
	      	component: studyDetail
	    },
	    {
	    	name: 'eassyInfo',
	      	path: '/eassyInfo',
	      	component: eassyInfo
	    },
	    {
	    	name: 'submission',
	      	path: '/submission',
	      	component: submission
	    },
	    {
	    	name: 'proposal',
	      	path: '/proposal',
	      	component: proposal
	    },
	    {
	    	name: 'proposalDetail',
	      	path: '/proposalDetail',
	      	component: proposalDetail
	    },
	    {
	    	name: 'releaseProposal',
	      	path: '/releaseProposal',
	      	component: releaseProposal
	    },
	    {
	    	name: 'partyData',
	      	path: '/partyData',
	      	component: partyData
	    },
	    {
	    	name: 'rank',
	      	path: '/rank',
	      	component: rank
	    },
	    {
	    	name: 'personRank',
	      	path: '/personRank',
	      	component: personRank
	    },
	    {
	    	name: 'personData',
	      	path: '/personData',
	      	component: personData
	    },
	    {
	    	name: 'scheduleRecord',
	      	path: '/scheduleRecord',
	      	component: scheduleRecord
	    },
	    {
	    	name: 'partyRank',
	      	path: '/partyRank',
	      	component: partyRank
	    },
	    {
	    	name: 'publicWelfare',
	      	path: '/publicWelfare',
	      	component: publicWelfare
	    },
	    {
	    	name: 'loveDonation',
	      	path: '/loveDonation',
	      	component: loveDonation
	    },
	    {
	    	name: 'donationDetail',
	      	path: '/donationDetail',
	      	component: donationDetail
	    },
	    {
	    	name: 'questionnaireInvestigation',
	      	path: '/questionnaireInvestigation',
	      	component: questionnaireInvestigation
	    },
	    {
	    	name: 'vote',
	      	path: '/vote',
	      	component: vote
	    },
	    {
	    	name: 'membershipDues',
	      	path: '/membershipDues',
	      	component: membershipDues
	    },
	    {
	    	name: 'schedule',
	      	path: '/schedule',
	      	component: schedule
	    },
	    {
	    	name: 'myEssay',
	      	path: '/myEssay',
	      	component: myEssay
	    },
	    {
	    	name: 'myCollection',
	      	path: '/myCollection',
	      	component: myCollection
	    },
	    {
	    	name: 'myNews',
	      	path: '/myNews',
	      	component: myNews
	    },
	    {
	    	name: 'myInformation',
	      	path: '/myInformation',
	      	component: myInformation
	    },
	    {
	    	name: 'myProposal',
	      	path: '/myProposal',
	      	component: myProposal
	    },
	    {
	    	name: 'partyPortrait',
	      	path: '/partyPortrait',
	      	component: partyPortrait
	    },
	    {
	    	name: 'actList',
	      	path: '/actList',
	      	component: actList
	    },
	    {
	    	name: 'mienList',
	      	path: '/mienList',
	      	component: mienList
	    },
	    {
	    	name: 'proposalOld',
	      	path: '/proposalOld',
	      	component: proposalOld
	    }
  	]
})
export default router
