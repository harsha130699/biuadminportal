export interface AppointmentReq {
    uid: string;
    startTime: string;
    duration: string;
    name: string;
    isAccepted:boolean;
    isRejected:boolean;
    tou:string;
    startTimeObj?:Date;
}
