import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const userId = params.user_id;

	// Temporary user data for development
	const tempUserProfile = {
		id: userId,
		name: '김철수',
		email: 'kim.chulsoo@example.com',
		avatar: '/src/lib/assets/example/ex_profile.png',
		phone: '010-1234-5678',
		birthDate: '1990-05-15',
		interests: ['경제학', '투자', '부동산', '재테크'],
		joinedDate: '2024-01-15'
	};

	const tempSubscriptions = [
		{
			id: 'sub1',
			creatorId: 'creator1',
			creatorName: '김선생의 경제 교실',
			creatorAvatar: '/src/lib/assets/example/ex_profile.png',
			planType: 'premium' as const,
			planName: 'Premium Plan',
			price: 19900,
			subscriptionDate: '2024-08-15',
			nextBillingDate: '2025-01-15',
			status: 'active' as const,
			autoRenewal: true
		},
		{
			id: 'sub2',
			creatorId: 'creator2',
			creatorName: '투자의 달인',
			creatorAvatar: '/src/lib/assets/example/ex_profile.png',
			planType: 'basic' as const,
			planName: 'Basic Plan',
			price: 9900,
			subscriptionDate: '2024-09-01',
			nextBillingDate: '2025-01-01',
			status: 'active' as const,
			autoRenewal: false
		},
		{
			id: 'sub3',
			creatorId: 'creator3',
			creatorName: '부동산 전문가',
			creatorAvatar: '/src/lib/assets/example/ex_profile.png',
			planType: 'pro' as const,
			planName: 'Pro Plan',
			price: 29900,
			subscriptionDate: '2024-07-10',
			nextBillingDate: '2024-12-10',
			status: 'expired' as const,
			autoRenewal: false
		}
	];

	const tempCourseProgress = [
		{
			courseId: '1',
			courseTitle: '30분만에 끝내는 경제 뉴스 읽기',
			creatorName: '김선생의 경제 교실',
			progress: 75,
			lastWatched: '2025-09-20',
			totalChapters: 8,
			completedChapters: 6,
			thumbnail: '/src/lib/assets/example/ex1.jpg'
		},
		{
			courseId: '2',
			courseTitle: '직장인을 위한 생활 경제학',
			creatorName: '김선생의 경제 교실',
			progress: 45,
			lastWatched: '2025-09-18',
			totalChapters: 12,
			completedChapters: 5,
			thumbnail: '/src/lib/assets/example/ex2.jpg'
		},
		{
			courseId: '3',
			courseTitle: '부동산 투자 기초',
			creatorName: '부동산 전문가',
			progress: 20,
			lastWatched: '2025-09-15',
			totalChapters: 10,
			completedChapters: 2,
			thumbnail: '/src/lib/assets/example/ex3.jpg'
		}
	];

	const tempPaymentMethods = [
		{
			id: 'pm1',
			type: 'credit_card' as const,
			lastFour: '1234',
			cardBrand: 'Visa',
			expiryDate: '12/26',
			isDefault: true,
			addedDate: '2024-01-15'
		},
		{
			id: 'pm2',
			type: 'debit_card' as const,
			lastFour: '5678',
			cardBrand: 'MasterCard',
			expiryDate: '08/25',
			isDefault: false,
			addedDate: '2024-03-20'
		},
		{
			id: 'pm3',
			type: 'bank_account' as const,
			lastFour: '9012',
			bankName: '국민은행',
			isDefault: false,
			addedDate: '2024-06-10'
		}
	];

	const tempTransactions = [
		{
			id: 'tx1',
			type: 'subscription' as const,
			description: '김선생의 경제 교실 - Premium Plan',
			amount: 19900,
			date: '2025-09-15',
			status: 'completed' as const,
			paymentMethodId: 'pm1',
			creatorName: '김선생의 경제 교실'
		},
		{
			id: 'tx2',
			type: 'subscription' as const,
			description: '투자의 달인 - Basic Plan',
			amount: 9900,
			date: '2025-09-01',
			status: 'completed' as const,
			paymentMethodId: 'pm1',
			creatorName: '투자의 달인'
		},
		{
			id: 'tx3',
			type: 'course' as const,
			description: '개별 강의 구매 - 경제 지표 분석',
			amount: 15000,
			date: '2025-08-20',
			status: 'completed' as const,
			paymentMethodId: 'pm2'
		},
		{
			id: 'tx4',
			type: 'refund' as const,
			description: '부동산 전문가 - Pro Plan 환불',
			amount: -29900,
			date: '2025-08-10',
			status: 'completed' as const,
			paymentMethodId: 'pm1',
			creatorName: '부동산 전문가'
		}
	];

	return {
		userProfile: tempUserProfile,
		subscriptions: tempSubscriptions,
		courseProgress: tempCourseProgress,
		paymentMethods: tempPaymentMethods,
		transactions: tempTransactions
	};
};