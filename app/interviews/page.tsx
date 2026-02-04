import { Interviews } from "@/components/interviews"
import { InterviewFilters } from "@/components/interview-filters"
import { Sparkles } from "lucide-react"

export default function InterviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 py-12 md:py-20 space-y-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary/50 backdrop-blur-sm border-primary/20 text-primary animate-fade-in-up">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>Community Insights</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground animate-fade-in-up [animation-delay:200ms]">
            Master Your Next <br />
            <span className="text-primary">Interview</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up [animation-delay:400ms]">
            Discover real interview experiences from top tech companies.
            Filter by role, company, and level to find exactly what you need.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] animate-fade-in-up [animation-delay:600ms]">
          <aside className="space-y-6">
            <div className="sticky top-24 p-6 rounded-2xl border bg-card/50 backdrop-blur-xl shadow-lg border-primary/10 transition-all duration-300 hover:shadow-primary/5 hover:border-primary/20">
              <InterviewFilters />
            </div>
          </aside>

          <main>
            <Interviews />
          </main>
        </div>
      </div>
    </div>
  )
}
