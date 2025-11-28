# Chat App - Mock Frontend Guide

## Overview
A complete React Native chat application with mock data, built using Expo and TypeScript.

## Features Implemented

### 1. Onboarding Flow (`app/onboarding.tsx`)
- User profile setup with name, email, and bio
- Avatar selection from 8 preset options
- Redirects to main app after completion

### 2. Contacts/Chats Screen (`app/(tabs)/contacts.tsx`)
- View all contacts with avatars
- See online/offline status with indicators
- Display last message preview
- Show unread message count badges
- Tap to open chat with a contact
- Add new contacts button

### 3. Add Contact Screen (`app/add-contact.tsx`)
- Form to add new contacts
- Avatar selection
- Name and email input
- Immediately updates contacts list

### 4. Chat Screen (`app/chat/[id].tsx`)
- Dynamic route for each contact
- Message bubbles with timestamps
- Send new messages
- Auto-scroll to latest message
- Contact header with status
- Mark messages as read automatically

### 5. Profile Screen (`app/(tabs)/profile.tsx`)
- View/edit your profile
- Change avatar
- Update name, email, and bio
- Display user ID

## File Structure

```
app/
├── types/
│   └── chat.ts                 # TypeScript interfaces
├── mock/
│   └── data.ts                 # Mock data for testing
├── context/
│   └── ChatContext.tsx         # State management
├── app/
│   ├── _layout.tsx             # Root navigation
│   ├── onboarding.tsx          # Onboarding screen
│   ├── add-contact.tsx         # Add contact screen
│   ├── chat/
│   │   └── [id].tsx            # Dynamic chat screen
│   └── (tabs)/
│       ├── _layout.tsx         # Tab navigation
│       ├── contacts.tsx        # Contacts list
│       └── profile.tsx         # Profile screen
```

## How to Run

```bash
cd app
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Mock Data

The app comes with:
- 4 pre-configured contacts (Alice, Bob, Charlie, Diana)
- Sample messages and conversations
- 8 avatar options
- Current user that needs onboarding

## User Flow

1. **First Launch** → Onboarding screen
   - Set up profile (name, email, bio, avatar)
   - Click "Get Started"

2. **Main App** → Two tabs at the bottom:
   - **Chats Tab**: View all contacts and conversations
   - **Profile Tab**: View/edit your profile

3. **From Chats Tab**:
   - Tap "Add" button → Add new contact
   - Tap any contact → Open chat screen

4. **In Chat Screen**:
   - View message history
   - Send new messages
   - See message timestamps
   - Auto-scroll to latest

5. **In Profile Tab**:
   - Tap "Edit" → Modify your profile
   - Change avatar, name, email, bio
   - Tap "Save" to confirm

## Next Steps (When Ready for Backend)

To integrate with your NestJS backend and MQTT Ably:

1. Replace mock data with API calls
2. Connect `sendMessage` to MQTT publisher
3. Subscribe to MQTT topics for receiving messages
4. Add real-time presence updates
5. Implement authentication
6. Add image upload for custom avatars

## State Management

All app state is managed through `ChatContext` which provides:
- `currentUser` - Your profile
- `contacts` - List of contacts
- `conversations` - Chat histories
- `sendMessage()` - Send a message
- `addContact()` - Add new contact
- `updateCurrentUser()` - Update profile
- `markMessagesAsRead()` - Mark messages as read

Access anywhere with:
```tsx
const { currentUser, contacts, sendMessage } = useChatContext();
```
