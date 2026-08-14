import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetDoctorReviewsQuery, useAddDoctorReviewMutation } from '../../features/doctor/doctorApi';
import { useForm } from 'react-hook-form';

const DoctorReviews = ({ doctorId }) => {
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, refetch } = useGetDoctorReviewsQuery(doctorId);
  const [addReview, { isLoading: isSubmitting }] = useAddDoctorReviewMutation();
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }
    
    try {
      await addReview({
        doctorId,
        patientId: user._id,
        patientName: user.username,
        rating: Number(formData.rating),
        comment: formData.comment
      }).unwrap();
      
      toast.success("Review submitted successfully!");
      reset();
      setShowReviewForm(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit review");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            width="16" 
            height="16" 
            fill={star <= rating ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const reviews = data?.reviews || [];

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6 border-b border-[var(--border-color)] pb-4">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Patient Reviews</h3>
        {user ? (
          <button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className={`btn-action ${showReviewForm ? 'btn-action-outline' : 'btn-action-primary'} py-2 px-6`}
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        ) : (
          <div className="text-sm text-[var(--text-muted)]">Login to write a review</div>
        )}
      </div>

      {showReviewForm && (
        <div className="bg-[var(--surface-secondary)] p-6 rounded-2xl border border-[var(--border-color)] mb-8 slide-up">
          <h4 className="font-bold text-[var(--text-primary)] mb-4">Submit Your Review</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
            <div className="form-group">
              <label className="form-label">Rating</label>
              <select 
                className="form-select" 
                {...register("rating", { required: "Rating is required" })}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            
            <div className="form-group mt-4">
              <label className="form-label">Your Comment</label>
              <textarea 
                className="form-input min-h-[100px]" 
                placeholder="Share your experience with this doctor..."
                {...register("comment", { required: "Comment is required" })}
              />
              {errors.comment && <p className="form-error">{errors.comment.message}</p>}
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="form-submit w-auto px-8"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center p-8 text-[var(--text-muted)]">Loading reviews...</div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-[var(--surface-secondary)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-dark)] text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {review.patientName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-bold text-[var(--text-primary)]">{review.patientName}</h5>
                    <div className="text-xs text-[var(--text-muted)] mt-1">
                      {new Date(review.createdAt).toLocaleDateString(undefined, { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-[var(--surface-secondary)] rounded-2xl border border-dashed border-[var(--border-color)]">
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto text-[var(--text-muted)] mb-4 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <p className="text-[var(--text-muted)] text-lg">No reviews yet for this doctor.</p>
          <p className="text-[var(--text-muted)] text-sm mt-1">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

export default DoctorReviews;
