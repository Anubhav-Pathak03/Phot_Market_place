import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../store/slices/bookingsSlice';
import { RootState } from '../../store';
import { Photographer } from '../../types';
import Button from '../ui/Button';
import { Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';

// Form validation schema
const bookingSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  location: z.string().min(3, 'Location is required').max(100, 'Location is too long'),
  sessionType: z.string().min(1, 'Session type is required'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  photographer: Photographer;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ photographer, onSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading, success } = useSelector((state: RootState) => state.bookings);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      sessionType: '',
      notes: '',
    },
  });
  
  React.useEffect(() => {
    if (success) {
      reset();
      onSuccess();
    }
  }, [success, reset, onSuccess]);
  
  const onSubmit = (data: BookingFormData) => {
    if (!user) return;
    
    dispatch(createBooking(user.id, photographer.id, data) as any);
  };
  
  const sessionTypes = [
    'Portrait Session',
    'Family Session',
    'Wedding Photography',
    'Event Coverage',
    'Product Photography',
    'Real Estate Photography',
    'Fashion Shoot',
    'Corporate Headshots',
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Book a Session</h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Date */}
          <div>
            <label htmlFor="date" className="form-label flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Date
            </label>
            <input
              id="date"
              type="date"
              className="form-input"
              {...register('date')}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <p className="form-error">{errors.date.message}</p>}
          </div>
          
          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="form-label flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                className="form-input"
                {...register('startTime')}
              />
              {errors.startTime && <p className="form-error">{errors.startTime.message}</p>}
            </div>
            <div>
              <label htmlFor="endTime" className="form-label">End Time</label>
              <input
                id="endTime"
                type="time"
                className="form-input"
                {...register('endTime')}
              />
              {errors.endTime && <p className="form-error">{errors.endTime.message}</p>}
            </div>
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="form-label flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </label>
            <input
              id="location"
              type="text"
              className="form-input"
              placeholder="Enter location details"
              {...register('location')}
            />
            {errors.location && <p className="form-error">{errors.location.message}</p>}
          </div>
          
          {/* Session Type */}
          <div>
            <label htmlFor="sessionType" className="form-label">Session Type</label>
            <select
              id="sessionType"
              className="form-input"
              {...register('sessionType')}
            >
              <option value="">Select session type</option>
              {sessionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.sessionType && <p className="form-error">{errors.sessionType.message}</p>}
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="form-label flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              className="form-input"
              placeholder="Any special requests or details about the session"
              {...register('notes')}
            ></textarea>
            {errors.notes && <p className="form-error">{errors.notes.message}</p>}
          </div>
          
          {/* Estimated Price */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Estimated Total:</span>
              <span className="font-semibold text-lg">${photographer.hourlyRate * 2}.00</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Final price may vary based on session duration and additional services
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            fullWidth
          >
            Request Booking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;