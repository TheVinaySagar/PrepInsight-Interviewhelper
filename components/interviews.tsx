"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MessageSquare, ThumbsUp, Loader2, Building2, UserCircle2, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Interview = {
  _id: string;
  company: string;
  role: string;
  level: string;
  tags?: string[];
  authorName: string;
  authorAvatar?: string;
  author?: { name: string; initials: string };
  createdAt: string;
  likes: number;
  comments: number;
  experience?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -5, transition: { duration: 0.2 } },
};

export function Interviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const queryParams = searchParams.toString();
        const response = await axios.get<Interview[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/interviews?${queryParams}`
        );
        setInterviews(response.data);
      } catch (err) {
        setError("Failed to fetch interviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col h-64 items-center justify-center space-y-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-primary/20 animate-spin border-t-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Curating insights...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center space-y-4 p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
          <p className="text-destructive font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Try Refreshing
          </button>
        </div>
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <div className="flex flex-col h-64 items-center justify-center space-y-2 p-8 text-center border-2 border-dashed rounded-3xl bg-card/30">
        <div className="p-4 rounded-full bg-muted/50 mb-2">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-xl font-semibold">No interviews found</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-2"
    >
      <AnimatePresence mode="popLayout">
        {interviews.map((interview) => {
          const interviewId = interview._id ? encodeURIComponent(interview._id) : null;

          return interviewId ? (
            <motion.div
              key={interview._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              layout
            >
              <Link href={`/interviews/${interviewId}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl">
                <Card className="flex flex-col h-full border-muted/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 dark:hover:bg-card/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 group rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardHeader className="p-6 pb-4 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <CardTitle className="text-xl font-bold tracking-tight truncate group-hover:text-primary transition-colors">
                            {interview.company}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <span className="truncate">{interview.role}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "px-2.5 py-0.5 text-xs font-medium rounded-full shrink-0 border",
                          interview.level === "Senior" && "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
                          interview.level === "Mid" && "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
                          interview.level === "Junior" && "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
                          interview.level === "Internship" && "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400"
                        )}
                      >
                        {interview.level}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 py-2 flex-grow space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {interview.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-0.5 bg-background/50 text-muted-foreground border-muted hover:border-primary/30 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                      {interview.tags && interview.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 bg-background/50 text-muted-foreground border-muted">
                          +{interview.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {interview.experience && (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {interview.experience}
                      </p>
                    )}
                  </CardContent>

                  <CardFooter className="px-6 py-4 mt-auto border-t border-muted/40 bg-muted/5">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8 ring-2 ring-background ring-offset-2 ring-offset-background/50">
                          {interview.authorName === "Anonymous" ? (
                            <AvatarFallback className="bg-primary/5 text-primary">
                              <UserCircle2 className="h-5 w-5" />
                            </AvatarFallback>
                          ) : (
                            <>
                              <AvatarImage src={interview.authorAvatar} alt={interview.author?.name} />
                              <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                                {interview.author?.initials || interview.authorName?.charAt(0) || "?"}
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>

                        <div className="flex flex-col">
                          <span className="text-xs font-medium truncate max-w-[100px]">
                            {interview.authorName || "Anonymous"}
                          </span>
                          <time dateTime={interview.createdAt} className="text-[10px] text-muted-foreground">
                            {new Date(interview.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{interview.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{interview.comments || 0}</span>
                        </div>
                        <div className="w-px h-4 bg-border mx-1" />
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ) : null;
        })}
      </AnimatePresence>
    </motion.div>
  );
}
