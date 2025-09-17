

export class Lesson {
    private category: string;
    private lesson_name: string
    private questions: Question[];

    public constructor(category: string, lesson_name: string, questions: Question[]){
        this.category = category;
        this.lesson_name = lesson_name;
        this.questions = questions
    }

    // Getters for accessing private properties
    public getCategory(): string {
        return this.category;
    }

    public getLessonName(): string {
        return this.lesson_name;
    }

    public getQuestions(): Question[] {
        return this.questions;
    }
}

export class Question{
    private question: string;
    private answer_choices: string[];
    private correct_answer: string;

    public constructor(question: string, answer_choices: string[], correct_answer: string){
        this.question = question;
        this.answer_choices = answer_choices;
        this.correct_answer = correct_answer;
    }

    // Getters for accessing private properties
    public getQuestion(): string {
        return this.question;
    }

    public getAnswerChoices(): string[] {
        return this.answer_choices;
    }

    public getCorrectAnswer(): string {
        return this.correct_answer;
    }
}

// Financial Education Courses Dictionary
export const Courses: { [key: string]: Lesson[] } = {
    "Financial Basics": [
        new Lesson("Financial Basics", "What is Money?", [
            new Question(
                "What is the primary function of money?",
                ["To make people happy", "A medium of exchange", "To show wealth", "To collect interest"],
                "A medium of exchange"
            ),
            new Question(
                "Which of these is NOT a characteristic of good money?",
                ["Durable", "Divisible", "Heavy and bulky", "Portable"],
                "Heavy and bulky"
            )
        ]),
        
        new Lesson("Financial Basics", "Understanding Income", [
            new Question(
                "What is gross income?",
                ["Income after taxes", "Income before any deductions", "Only salary income", "Investment returns only"],
                "Income before any deductions"
            ),
            new Question(
                "Which is an example of passive income?",
                ["Working overtime", "Rental property income", "Freelance work", "Part-time job"],
                "Rental property income"
            )
        ]),
        
        new Lesson("Financial Basics", "Budgeting Basics", [
            new Question(
                "What is the main purpose of a budget?",
                ["To limit all spending", "To plan and track your money", "To make you feel guilty", "To impress others"],
                "To plan and track your money"
            ),
            new Question(
                "What does the 50/30/20 rule suggest?",
                ["50% wants, 30% needs, 20% savings", "50% needs, 30% wants, 20% savings", "50% savings, 30% needs, 20% wants", "All money for needs only"],
                "50% needs, 30% wants, 20% savings"
            )
        ])
    ],

    "Saving & Emergency Funds": [
        new Lesson("Saving & Emergency Funds", "Building Your First Emergency Fund", [
            new Question(
                "How much should a starter emergency fund contain?",
                ["$10,000", "$500-$1,000", "$5,000", "6 months of expenses"],
                "$500-$1,000"
            ),
            new Question(
                "Where should you keep your emergency fund?",
                ["Stock market", "High-yield savings account", "Under your mattress", "Cryptocurrency"],
                "High-yield savings account"
            )
        ]),
        
        new Lesson("Saving & Emergency Funds", "Smart Savings Strategies", [
            new Question(
                "What is compound interest?",
                ["Interest paid only on principal", "Interest earned on interest", "Bank fees", "Investment losses"],
                "Interest earned on interest"
            ),
            new Question(
                "Which saves more money over time?",
                ["Saving $10 daily", "Saving $300 monthly", "Saving $70 weekly", "All are the same"],
                "All are the same"
            )
        ]),
        
        new Lesson("Saving & Emergency Funds", "Advanced Emergency Planning", [
            new Question(
                "A full emergency fund should cover how many months of expenses?",
                ["1-2 months", "3-6 months", "12 months", "2 years"],
                "3-6 months"
            ),
            new Question(
                "What qualifies as a true emergency?",
                ["Vacation opportunity", "Sale on clothes", "Job loss", "New phone release"],
                "Job loss"
            )
        ])
    ],

    "Debt Management": [
        new Lesson("Debt Management", "Understanding Different Types of Debt", [
            new Question(
                "Which is considered 'good debt'?",
                ["Credit card debt", "Payday loans", "Student loans for education", "Luxury car loans"],
                "Student loans for education"
            ),
            new Question(
                "What is the difference between secured and unsecured debt?",
                ["Secured debt has collateral backing it", "Unsecured debt has lower interest", "No difference", "Secured debt is always smaller"],
                "Secured debt has collateral backing it"
            )
        ]),
        
        new Lesson("Debt Management", "Debt Payoff Strategies", [
            new Question(
                "What is the debt snowball method?",
                ["Pay minimums on all debts", "Pay highest interest first", "Pay smallest balance first", "Never pay more than minimum"],
                "Pay smallest balance first"
            ),
            new Question(
                "What is the debt avalanche method?",
                ["Pay smallest balance first", "Pay highest interest rate first", "Pay newest debt first", "Pay largest balance first"],
                "Pay highest interest rate first"
            )
        ]),
        
        new Lesson("Debt Management", "Credit Cards and Credit Scores", [
            new Question(
                "What factor has the biggest impact on your credit score?",
                ["Length of credit history", "Payment history", "Types of credit", "New credit inquiries"],
                "Payment history"
            ),
            new Question(
                "What is a good credit utilization ratio?",
                ["90%", "50%", "Under 30%", "100%"],
                "Under 30%"
            )
        ])
    ],

    "Investing Fundamentals": [
        new Lesson("Investing Fundamentals", "Introduction to Investing", [
            new Question(
                "What is the primary goal of investing?",
                ["Get rich quick", "Beat inflation and grow wealth over time", "Gambling on stocks", "Show off to friends"],
                "Beat inflation and grow wealth over time"
            ),
            new Question(
                "What is diversification?",
                ["Putting all money in one stock", "Spreading investments across different assets", "Only buying expensive stocks", "Avoiding all risk"],
                "Spreading investments across different assets"
            )
        ]),
        
        new Lesson("Investing Fundamentals", "Stocks, Bonds, and ETFs", [
            new Question(
                "What does owning a stock represent?",
                ["Lending money to a company", "Ownership in a company", "Government debt", "Real estate ownership"],
                "Ownership in a company"
            ),
            new Question(
                "What is an ETF?",
                ["A single stock", "Exchange Traded Fund", "Emergency Trust Fund", "European Trading Fund"],
                "Exchange Traded Fund"
            )
        ]),
        
        new Lesson("Investing Fundamentals", "Risk and Return", [
            new Question(
                "Generally, what is the relationship between risk and return?",
                ["Higher risk = lower return", "Higher risk = higher potential return", "No relationship", "Risk doesn't matter"],
                "Higher risk = higher potential return"
            ),
            new Question(
                "What is dollar-cost averaging?",
                ["Investing a large sum at once", "Investing the same amount regularly", "Only buying when prices are low", "Selling when prices drop"],
                "Investing the same amount regularly"
            )
        ])
    ],

    "Advanced Financial Planning": [
        new Lesson("Advanced Financial Planning", "Retirement Planning Basics", [
            new Question(
                "What is a 401(k)?",
                ["A type of credit card", "Employer-sponsored retirement account", "Bank account", "Investment strategy"],
                "Employer-sponsored retirement account"
            ),
            new Question(
                "What is the benefit of starting retirement savings early?",
                ["Higher salary", "Compound interest over time", "Immediate access to funds", "Lower taxes today"],
                "Compound interest over time"
            )
        ]),
        
        new Lesson("Advanced Financial Planning", "Insurance and Protection", [
            new Question(
                "What is the primary purpose of insurance?",
                ["Make money", "Transfer financial risk", "Avoid all risks", "Replace investing"],
                "Transfer financial risk"
            ),
            new Question(
                "Which insurance is most important for young adults?",
                ["Whole life insurance", "Health insurance", "Disability insurance", "Travel insurance"],
                "Health insurance"
            )
        ]),
        
        new Lesson("Advanced Financial Planning", "Tax Planning and Optimization", [
            new Question(
                "What is a tax-advantaged account?",
                ["Regular checking account", "Account with tax benefits", "Account with higher fees", "Savings account only"],
                "Account with tax benefits"
            ),
            new Question(
                "What is the difference between tax-deferred and tax-free accounts?",
                ["No difference", "Tax-deferred pays taxes later, tax-free never pays taxes on growth", "Tax-free has higher fees", "Tax-deferred is only for rich people"],
                "Tax-deferred pays taxes later, tax-free never pays taxes on growth"
            )
        ])
    ]
};
