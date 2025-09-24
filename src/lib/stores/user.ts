import { writable } from 'svelte/store';

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	avatar: string;
	phone: string;
	birthDate: string;
	interests: string[];
	joinedDate: string;
}

export interface Subscription {
	id: string;
	creatorId: string;
	creatorName: string;
	creatorAvatar: string;
	planType: 'basic' | 'premium' | 'pro';
	planName: string;
	price: number;
	subscriptionDate: string;
	nextBillingDate: string;
	status: 'active' | 'expired' | 'cancelled';
	autoRenewal: boolean;
}

export interface CourseProgress {
	courseId: string;
	courseTitle: string;
	creatorName: string;
	progress: number;
	lastWatched: string;
	totalChapters: number;
	completedChapters: number;
	thumbnail: string;
}

export interface PaymentMethod {
	id: string;
	type: 'credit_card' | 'debit_card' | 'bank_account';
	lastFour: string;
	cardBrand?: string;
	bankName?: string;
	expiryDate?: string;
	isDefault: boolean;
	addedDate: string;
}

export interface Transaction {
	id: string;
	type: 'subscription' | 'course' | 'refund';
	description: string;
	amount: number;
	date: string;
	status: 'completed' | 'pending' | 'failed';
	paymentMethodId: string;
	creatorName?: string;
}

const mockUserProfile: UserProfile = {
	id: 'user1',
	name: '김철수',
	email: 'kim.chulsoo@example.com',
	avatar: '/assets/example/ex_profile.png',
	phone: '010-1234-5678',
	birthDate: '1990-05-15',
	interests: ['경제학', '투자', '부동산', '재테크'],
	joinedDate: '2024-01-15'
};

const mockSubscriptions: Subscription[] = [
	{
		id: 'sub1',
		creatorId: 'creator1',
		creatorName: '김선생의 경제 교실',
		creatorAvatar: '/assets/example/ex_profile.png',
		planType: 'premium',
		planName: 'Premium Plan',
		price: 19900,
		subscriptionDate: '2024-08-15',
		nextBillingDate: '2025-01-15',
		status: 'active',
		autoRenewal: true
	},
	{
		id: 'sub2',
		creatorId: 'creator2',
		creatorName: '투자의 달인',
		creatorAvatar: '/assets/example/ex_profile.png',
		planType: 'basic',
		planName: 'Basic Plan',
		price: 9900,
		subscriptionDate: '2024-09-01',
		nextBillingDate: '2025-01-01',
		status: 'active',
		autoRenewal: false
	},
	{
		id: 'sub3',
		creatorId: 'creator3',
		creatorName: '부동산 전문가',
		creatorAvatar: '/assets/example/ex_profile.png',
		planType: 'pro',
		planName: 'Pro Plan',
		price: 29900,
		subscriptionDate: '2024-07-10',
		nextBillingDate: '2024-12-10',
		status: 'expired',
		autoRenewal: false
	}
];

const mockCourseProgress: CourseProgress[] = [
	{
		courseId: '1',
		courseTitle: '30분만에 끝내는 경제 뉴스 읽기',
		creatorName: '김선생의 경제 교실',
		progress: 75,
		lastWatched: '2025-09-20',
		totalChapters: 8,
		completedChapters: 6,
		thumbnail: '/assets/example/ex1.jpg'
	},
	{
		courseId: '2',
		courseTitle: '직장인을 위한 생활 경제학',
		creatorName: '김선생의 경제 교실',
		progress: 45,
		lastWatched: '2025-09-18',
		totalChapters: 12,
		completedChapters: 5,
		thumbnail: '/assets/example/ex2.jpg'
	},
	{
		courseId: '3',
		courseTitle: '부동산 투자 기초',
		creatorName: '부동산 전문가',
		progress: 20,
		lastWatched: '2025-09-15',
		totalChapters: 10,
		completedChapters: 2,
		thumbnail: '/assets/example/ex3.jpg'
	}
];

const mockPaymentMethods: PaymentMethod[] = [
	{
		id: 'pm1',
		type: 'credit_card',
		lastFour: '1234',
		cardBrand: 'Visa',
		expiryDate: '12/26',
		isDefault: true,
		addedDate: '2024-01-15'
	},
	{
		id: 'pm2',
		type: 'credit_card',
		lastFour: '5678',
		cardBrand: 'MasterCard',
		expiryDate: '08/25',
		isDefault: false,
		addedDate: '2024-03-20'
	},
	{
		id: 'pm3',
		type: 'bank_account',
		lastFour: '9012',
		bankName: '국민은행',
		isDefault: false,
		addedDate: '2024-06-10'
	}
];

const mockTransactions: Transaction[] = [
	{
		id: 'tx1',
		type: 'subscription',
		description: '김선생의 경제 교실 - Premium Plan',
		amount: 19900,
		date: '2025-09-15',
		status: 'completed',
		paymentMethodId: 'pm1',
		creatorName: '김선생의 경제 교실'
	},
	{
		id: 'tx2',
		type: 'subscription',
		description: '투자의 달인 - Basic Plan',
		amount: 9900,
		date: '2025-09-01',
		status: 'completed',
		paymentMethodId: 'pm1',
		creatorName: '투자의 달인'
	},
	{
		id: 'tx3',
		type: 'course',
		description: '개별 강의 구매 - 경제 지표 분석',
		amount: 15000,
		date: '2025-08-20',
		status: 'completed',
		paymentMethodId: 'pm2'
	},
	{
		id: 'tx4',
		type: 'refund',
		description: '부동산 전문가 - Pro Plan 환불',
		amount: -29900,
		date: '2025-08-10',
		status: 'completed',
		paymentMethodId: 'pm1',
		creatorName: '부동산 전문가'
	}
];

function createUserStore() {
	const { subscribe, set, update } = writable<UserProfile>(mockUserProfile);

	return {
		subscribe,

		// Update user profile
		updateProfile: (updates: Partial<UserProfile>) => {
			update(profile => ({ ...profile, ...updates }));
		},

		// Get user by ID
		getById: (id: string) => {
			return id === 'user1' ? mockUserProfile : null;
		}
	};
}

function createSubscriptionStore() {
	const { subscribe, set, update } = writable<Subscription[]>(mockSubscriptions);

	return {
		subscribe,

		// Get subscriptions by user ID
		getByUserId: (userId: string) => {
			return mockSubscriptions;
		},

		// Cancel subscription
		cancelSubscription: (subscriptionId: string) => {
			update(subscriptions =>
				subscriptions.map(sub =>
					sub.id === subscriptionId
						? { ...sub, status: 'cancelled' as const, autoRenewal: false }
						: sub
				)
			);
		},

		// Toggle auto-renewal
		toggleAutoRenewal: (subscriptionId: string) => {
			update(subscriptions =>
				subscriptions.map(sub =>
					sub.id === subscriptionId
						? { ...sub, autoRenewal: !sub.autoRenewal }
						: sub
				)
			);
		}
	};
}

function createCourseProgressStore() {
	const { subscribe, set, update } = writable<CourseProgress[]>(mockCourseProgress);

	return {
		subscribe,

		// Get course progress by user ID
		getByUserId: (userId: string) => {
			return mockCourseProgress;
		},

		// Update course progress
		updateProgress: (courseId: string, progress: number, completedChapters: number) => {
			update(courses =>
				courses.map(course =>
					course.courseId === courseId
						? {
							...course,
							progress,
							completedChapters,
							lastWatched: new Date().toISOString().split('T')[0]
						}
						: course
				)
			);
		}
	};
}

function createPaymentMethodStore() {
	const { subscribe, set, update } = writable<PaymentMethod[]>(mockPaymentMethods);

	return {
		subscribe,

		// Get payment methods by user ID
		getByUserId: (userId: string) => {
			return mockPaymentMethods;
		},

		// Add payment method
		addPaymentMethod: (method: Omit<PaymentMethod, 'id' | 'addedDate'>) => {
			const newMethod: PaymentMethod = {
				...method,
				id: Date.now().toString(),
				addedDate: new Date().toISOString().split('T')[0]
			};

			update(methods => [...methods, newMethod]);
			return newMethod;
		},

		// Remove payment method
		removePaymentMethod: (methodId: string) => {
			update(methods => methods.filter(method => method.id !== methodId));
		},

		// Set default payment method
		setDefault: (methodId: string) => {
			update(methods =>
				methods.map(method => ({
					...method,
					isDefault: method.id === methodId
				}))
			);
		}
	};
}

function createTransactionStore() {
	const { subscribe, set, update } = writable<Transaction[]>(mockTransactions);

	return {
		subscribe,

		// Get transactions by user ID
		getByUserId: (userId: string) => {
			return mockTransactions;
		},

		// Add transaction
		addTransaction: (transaction: Omit<Transaction, 'id'>) => {
			const newTransaction: Transaction = {
				...transaction,
				id: Date.now().toString()
			};

			update(transactions => [newTransaction, ...transactions]);
			return newTransaction;
		}
	};
}

export const userStore = createUserStore();
export const subscriptionStore = createSubscriptionStore();
export const courseProgressStore = createCourseProgressStore();
export const paymentMethodStore = createPaymentMethodStore();
export const transactionStore = createTransactionStore();