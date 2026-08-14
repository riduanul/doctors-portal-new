import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserNotificationsQuery, useMarkNotificationAsReadMutation } from '../../features/notification/notificationApiSlice';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell = () => {
    const { email } = useSelector(state => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { data, isLoading } = useGetUserNotificationsQuery(email, { skip: !email });
    const [markAsRead] = useMarkNotificationAsReadMutation();

    const notifications = data?.notifications || [];
    const unreadCount = notifications.filter(n => !n.read).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkRead = (id) => {
        markAsRead(id);
    };

    if (!email) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-base-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-white bg-red-500 border-2 border-[var(--surface-primary)] rounded-full px-1">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-base-100 rounded-xl shadow-2xl border border-base-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-base-200 flex justify-between items-center bg-base-200">
                        <h3 className="font-semibold text-base-content">Notifications</h3>
                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                            {unreadCount} New
                        </span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {isLoading ? (
                            <div className="p-4 text-center text-base-content/50 text-sm">Loading...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center text-base-content/50">
                                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <p>You're all caught up!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {notifications.map((notification) => (
                                    <div 
                                        key={notification._id} 
                                        className={`p-4 border-b border-base-200 last:border-0 hover:bg-base-200 transition-colors cursor-default ${!notification.read ? 'bg-primary/5' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className={`w-2 h-2 rounded-full mt-1.5 ${!notification.read ? 'bg-primary' : 'bg-transparent'}`}></div>
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm ${!notification.read ? 'text-base-content font-medium' : 'text-base-content/70'}`}>
                                                    {notification.message}
                                                </p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-xs text-base-content/50">
                                                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                                    </span>
                                                    {!notification.read && (
                                                        <button 
                                                            onClick={() => handleMarkRead(notification._id)}
                                                            className="text-xs text-primary font-medium hover:underline focus:outline-none"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
