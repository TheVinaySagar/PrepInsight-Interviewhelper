"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Edit, MoreHorizontal, Trash, Eye, ThumbsUp, MessageSquare, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function UserInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteInterviewId, setDeleteInterviewId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/interviews/user-interviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInterviews(response.data);
    } catch (err) {
      setError('Failed to fetch interviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (interviewId: string) => {
    router.push(`/edit-interview/${interviewId}`);
  };

  const handleDeleteRequest = (interviewId: string) => {
    setDeleteInterviewId(interviewId);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteInterviewId) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error("Authentication required. Please log in again.");
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/interviews/${deleteInterviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setInterviews(interviews.filter((interview: any) => interview._id !== deleteInterviewId));
      toast.success("Interview experience deleted successfully");
    } catch (err) {
      toast.error("Failed to delete interview. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteInterviewId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteInterviewId(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Interviews</h2>
          <p className="text-muted-foreground text-sm">Manage your shared experiences</p>
        </div>
        <Button asChild className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
          <Link href="/submit">
            <Plus className="mr-2 h-4 w-4" />
            Share Experience
          </Link>
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="relative">
            <div className="h-10 w-10 rounded-full border-4 border-primary/20 animate-spin border-t-primary" />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      {/* Interview Cards */}
      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interviews.length > 0 ? (
            interviews.map((interview: {
              _id: string;
              company: string;
              role: string;
              level: string;
              status: string;
              createdAt: string;
              views?: number;
              likes?: number;
              comments?: number;
            }) => (
              <Card key={interview._id} className="group flex flex-col h-full border-muted/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold truncate pr-4">{interview.company}</CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="font-medium">{interview.role}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span>{interview.level}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleEdit(interview._id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteRequest(interview._id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>

                <CardContent className="py-2 flex-grow">
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    <span>Posted on {new Date(interview.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={interview.status === "published" ? "default" : interview.status === "draft" ? "secondary" : "outline"} className="capitalize">
                      {interview.status === "draft" && "Draft"}
                      {interview.status === "published" && "Published"}
                      {interview.status === "pending" && "Under Review"}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t bg-muted/5 py-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {interview.status === "published" && (
                      <>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{interview.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{interview.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{interview.comments || 0}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild className="ml-auto text-xs hover:text-primary hover:bg-primary/5">
                    <Link href={`/interviews/${interview._id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center space-y-4 border-2 border-dashed rounded-3xl bg-muted/5">
              <div className="p-4 rounded-full bg-primary/10">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">No interviews shared yet</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Start by sharing your interview experience and help others on their journey!
                </p>
              </div>
              <Button asChild className="mt-4 rounded-full">
                <Link href="/submit">Share First Experience</Link>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteInterviewId !== null} onOpenChange={(open: boolean) => !open && handleDeleteCancel()}>
        <AlertDialogContent className="sm:max-w-[425px] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Interview Experience?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your interview experience and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
            >
              {isDeleting ? "Deleting..." : "Delete Experience"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
