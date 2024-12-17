// src/lib/dashboard-firebase.ts
import { auth, db } from './firebase';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';

interface TaskData {
  task: string;
  dueDate?: Date | null;
  userId: string;
  completed?: boolean;
  createdAt?: any;
}

interface ProjectData {
  project: string;
  dueDate?: Date | null;
  userId: string;
  completed?: boolean;
  createdAt?: any;
}

interface GoalData {
  goal: string;
  dueDate?: Date | null;
  userId: string;
  completed?: boolean;
  createdAt?: any;
}

interface PlanData {
  plan: string;
  dueDate?: Date | null;
  userId: string;
  completed?: boolean;
  createdAt?: any;
}

interface TimerData {
  name: string;
  time: number;
  userId: string;
  createdAt: any;
  updatedAt?: any;
}

interface EventData {
  title: string;
  description: string;
  day: number;
  month: number;
  year: number;
  uid: string;
  linkedTaskId?: string;
  linkedGoalId?: string;
  linkedPlanId?: string;
  linkedProjectId?: string;
  startTime?: string;
  endTime?: string;
}

interface UserData {
  splashScreenShown?: boolean;
  nightMode?: 'enabled' | 'disabled';
  displayName?: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
}

// ----------------- Authentication -----------------
export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signUp(email: string, password: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  // Initialize user data
  await setDoc(doc(db, 'users', user.uid), { splashScreenShown: false }, { merge: true });
  return user;
}

// ----------------- User Data -----------------
export async function updateUserOnlineStatus(
  userId: string,
  online: boolean
): Promise<void> {
  await setDoc(
    doc(db, 'users', userId),
    {
      online,
      lastSeen: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function updateUserDisplayName(userId: string, displayName: string) {
  await updateDoc(doc(db, 'users', userId), { displayName });
}

export async function setUserNightMode(userId: string, enabled: boolean) {
  await setDoc(
    doc(db, 'users', userId),
    {
      nightMode: enabled ? 'enabled' : 'disabled',
    },
    { merge: true }
  );
}

export async function getUserData(userId: string): Promise<UserData | null> {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? (userDoc.data() as UserData) : null;
}

export async function markSplashScreenShown(userId: string): Promise<void> {
  await updateDoc(doc(db, 'users', userId), { splashScreenShown: true });
}

// ----------------- Tasks -----------------
export async function createTask(task: string, dueDate: Date | null, userId: string): Promise<DocumentReference<DocumentData>> {
  return addDoc(collection(db, 'tasks'), {
    task,
    dueDate: dueDate || null,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function updateTask(taskId: string, data: Partial<TaskData>) {
  await updateDoc(doc(db, 'tasks', taskId), data);
}

export async function deleteTask(taskId: string) {
  await deleteDoc(doc(db, 'tasks', taskId));
}

export function onTasksSnapshot(userId: string, callback: (tasks: DocumentData[]) => void) {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId), orderBy('dueDate'), orderBy('createdAt'));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });
}

// ----------------- Projects -----------------
export async function createProject(project: string, dueDate: Date | null, userId: string): Promise<DocumentReference<DocumentData>> {
  return addDoc(collection(db, 'projects'), {
    project,
    dueDate: dueDate || null,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function updateProject(projectId: string, data: Partial<ProjectData>) {
  await updateDoc(doc(db, 'projects', projectId), data);
}

export async function deleteProject(projectId: string) {
  await deleteDoc(doc(db, 'projects', projectId));
}

export function onProjectsSnapshot(userId: string, callback: (projects: DocumentData[]) => void) {
  const q = query(collection(db, 'projects'), where('userId', '==', userId), orderBy('dueDate'), orderBy('createdAt'));
  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(projects);
  });
}

// ----------------- Goals -----------------
export async function createGoal(goal: string, dueDate: Date | null, userId: string): Promise<DocumentReference<DocumentData>> {
  return addDoc(collection(db, 'goals'), {
    goal,
    dueDate: dueDate || null,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function updateGoal(goalId: string, data: Partial<GoalData>) {
  await updateDoc(doc(db, 'goals', goalId), data);
}

export async function deleteGoal(goalId: string) {
  await deleteDoc(doc(db, 'goals', goalId));
}

export function onGoalsSnapshot(userId: string, callback: (goals: DocumentData[]) => void) {
  const q = query(collection(db, 'goals'), where('userId', '==', userId), orderBy('dueDate'), orderBy('createdAt'));
  return onSnapshot(q, (snapshot) => {
    const goals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(goals);
  });
}

// ----------------- Plans -----------------
export async function createPlan(plan: string, dueDate: Date | null, userId: string): Promise<DocumentReference<DocumentData>> {
  return addDoc(collection(db, 'plans'), {
    plan,
    dueDate: dueDate || null,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function updatePlan(planId: string, data: Partial<PlanData>) {
  await updateDoc(doc(db, 'plans', planId), data);
}

export async function deletePlan(planId: string) {
  await deleteDoc(doc(db, 'plans', planId));
}

export function onPlansSnapshot(userId: string, callback: (plans: DocumentData[]) => void) {
  const q = query(collection(db, 'plans'), where('userId', '==', userId), orderBy('dueDate'), orderBy('createdAt'));
  return onSnapshot(q, (snapshot) => {
    const plans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(plans);
  });
}

// ----------------- Events -----------------
export async function createEvent(eventData: EventData): Promise<DocumentReference<DocumentData>> {
  return addDoc(collection(db, 'events'), {
    ...eventData,
  });
}

export async function deleteEvent(eventId: string) {
  await deleteDoc(doc(db, 'events', eventId));
}

export function onEventsSnapshot(userId: string, callback: (events: DocumentData[]) => void) {
  const q = query(collection(db, 'events'), where('uid', '==', userId));
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(events);
  });
}

// ----------------- Timers -----------------
export async function saveCustomTimerToFirestore(name: string, time: number, userId: string): Promise<string> {
  const docRef = await addDoc(collection(db, 'timers'), {
    name,
    time,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCustomTimerInFirestore(timerId: string, name: string, time: number) {
  await updateDoc(doc(db, 'timers', timerId), {
    name,
    time,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCustomTimerFromFirestore(timerId: string) {
  await deleteDoc(doc(db, 'timers', timerId));
}

export function onCustomTimersSnapshot(userId: string, callback: (timers: DocumentData[]) => void) {
  const q = query(collection(db, 'timers'), where('userId', '==', userId), orderBy('createdAt'));
  return onSnapshot(q, (snapshot) => {
    const timers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(timers);
  });
}

// ----------------- Linked Items (Task Events, etc.) -----------------
export async function createTaskEvent(taskId: string, taskTitle: string, dueDate: Date, userId: string) {
  const eventData: EventData = {
    title: taskTitle,
    description: "task converted to event",
    day: dueDate.getDate(),
    month: dueDate.getMonth() + 1,
    year: dueDate.getFullYear(),
    uid: userId,
    linkedTaskId: taskId,
    startTime: "",
    endTime: "",
  };
  await createEvent(eventData);
}

export async function createProjectEvent(projectId: string, projectTitle: string, dueDate: Date, userId: string) {
  const eventData: EventData = {
    title: projectTitle,
    description: "project converted to event",
    day: dueDate.getDate(),
    month: dueDate.getMonth() + 1,
    year: dueDate.getFullYear(),
    uid: userId,
    linkedProjectId: projectId,
    startTime: "",
    endTime: "",
  };
  await createEvent(eventData);
}

export async function createGoalEvent(goalId: string, goalTitle: string, dueDate: Date, userId: string) {
  const eventData: EventData = {
    title: goalTitle,
    description: "goal converted to event",
    day: dueDate.getDate(),
    month: dueDate.getMonth() + 1,
    year: dueDate.getFullYear(),
    uid: userId,
    linkedGoalId: goalId,
    startTime: "",
    endTime: "",
  };
  await createEvent(eventData);
}

export async function createPlanEvent(planId: string, planTitle: string, dueDate: Date, userId: string) {
  const eventData: EventData = {
    title: planTitle,
    description: "plan converted to event",
    day: dueDate.getDate(),
    month: dueDate.getMonth() + 1,
    year: dueDate.getFullYear(),
    uid: userId,
    linkedPlanId: planId,
    startTime: "",
    endTime: "",
  };
  await createEvent(eventData);
}
