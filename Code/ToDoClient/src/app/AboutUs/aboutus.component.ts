import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { LoginService } from '../Login/Services/LoginService';
import { LoggerService } from '../Shared/Services/LoggerService';

@Component({
    //moduleId: module.id,
    selector: '<app-aboutus>',
    templateUrl: 'aboutus.component.html'
})
export class AboutUsComponent implements OnInit {
    msg: string;
    jobs: IJob[] = [];
    lastJob: number = -1;
    servers: IServer[] = [
        { id: 0, processing: [] },
        { id: 1, processing: [] },
        { id: 2, processing: [] },
        { id: 3, processing: [] },
        { id: 4, processing: [] },
        { id: 5, processing: [] },
        { id: 6, processing: [] },
        { id: 7, processing: [] },
        { id: 8, processing: [] },
        { id: 9, processing: [] },
        { id: 10, processing: [] },
        { id: 11, processing: [] }
    ];
    lastServer: number = -1;
    nextServer: number = -1;
    //MAX_SERVERS_PER_JOB = 8;
    orderedlist: IBatch[] = [];
    //get diagnostic() { return JSON.stringify(this.jobs); }

    constructor(private _loginService: LoginService, private _logger: LoggerService) { }

    ngOnInit() {
        this._logger.log("In ngoninit() of AboutUsComponent");

        if (this._loginService.isAuthenticated())
            this.msg = "You are logged in!!";
        else
            this.msg = "I dont know who you are!";
    }

    AddJob(): void {
        this.lastJob = this.lastJob + 1;
        this.jobs.push(this.GetJob(this.lastJob));
    }

    GetJob(lj: number): IJob {
        var batchNums = this.GetRandomNum(20, 30);
        var arr: IBatch[] = [];
        for (var i = 0; i < batchNums; i++) {
            arr.push(this.GetBatch(i, lj));
        }
        
        var jt = this.GetRandomNum(1,3);

        return {
            id: lj,
            batches: arr,
            type: jt
        };
    }

    GetBatch(id: number, jid: number): IBatch {
        return {
            id: id,
            jobid: jid,
            duration: this.GetRandomNum(1, 30),
            status: false,
            startTime: null,
            server:null
        };
    }

    GetRandomNum(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min;
    }

    StartProcessingJobs(): void {
        //setInterval(this.ProcessJobs, 3000);
        let timer = Observable.timer(1000, 1000);
        timer.subscribe(t => this.PickFIFOBatch(t));

        let timer1 = Observable.timer(1000, 2000);
        timer1.subscribe(t => this.UpdateDoneBatches(t));
    }

    UpdateDoneBatches(tick): void {
        var currentTime = new Date();
        for (let server of this.servers) {
            if (server.processing.length > 0) {
                for (let batch of server.processing) {
                    var diff = currentTime.valueOf() - batch.startTime.valueOf();
                    if (diff > batch.duration * 1000) {
                        batch.status = true;
                    }
                }
            }
        }
    }

    FindAFreeServer(): void {
        if (this.nextServer == -1)
            this.nextServer++;
        else {
            this.nextServer = null;
            for (let server of this.servers) {
                var canSelect = true;
                for (let bat of server.processing) {
                    if (bat.status == false) {
                        canSelect = false;
                    }
                }
                if (canSelect) {
                    this.nextServer = this.servers.indexOf(server);
                    return;
                }
            }
        }
    }

    AcceptBatch(batch: IBatch): void {
        this.lastServer = this.nextServer;
        batch.startTime = new Date();
        batch.server = this.lastServer;
        this.orderedlist.push(batch);
        this.servers[this.lastServer].processing.push(batch);
        //this.jobs[batch.jobid].batches.shift();
    }

    PickJob(pickSmall:boolean): IJob {
        for (let job of this.jobs) {
            // check type
            if(pickSmall && job.type != 1) continue;
            
            // check if job has batches
            if(job.batches && job.batches.length == 0) {
                //this.jobs.splice(this.jobs.indexOf(job),1);
                //return null;
                continue;
            }

            // check if there are any unprocessed batch in the job
            if(this.DoesJobHavePendingBatches(job.id) == false) continue;

             
            // check if max servers per job limit would be hit
            if (this.GetCountOfServersDoingAJob(job.id) < this.GetMaxServersPerJob()) {
                return job;
            } else if(this.jobs.length==1){
                return job;
            }else if (this.IsOnlyJobProcessing(job.id) == true){
                return job;
            }
        }

        return null;
    }

    GetMaxServersPerJob():number{
        // if number of pending jobs is more than number of servers - return 1
        // else return number of servers / number of jobs
        var pendingJobs = this.GetPendingJobsCount();
        if(pendingJobs > this.servers.length){
            return 1;
        }else{
            return Math.floor(this.servers.length/pendingJobs);
        }
    }

    DoesJobHavePendingBatches(jid):boolean{
        var hasBatches = false;
        for(let bat of this.jobs[jid].batches){
            if(bat.startTime == null){
                hasBatches = true;
                break;
            }
        }
        return hasBatches;
    }

    GetPendingJobsCount():number{
        var count = 0;
        for(let job of this.jobs){
            if(this.DoesJobHavePendingBatches(job.id)) count++;
        }
        return count;
    }

    IsOnlyJobProcessing(jid):boolean{
        var count = 0;
        for(let job of this.jobs){
            if(job.id == jid) continue;
            if(this.DoesJobHavePendingBatches(job.id)) count++;
        }

        return count == 0;
    }

    PickFIFOBatch(ticks): void {
        if (this.jobs.length == 0) return;
        
        var job = this.PickJob(true);
        if (job == null) {
            job = this.PickJob(false);
        }
        if(job == null) return;

        var batch = null;
        // find first not started batch
        for(var bat of job.batches){
            if(bat.startTime == null){
                batch = bat;
                break;
            }
        }
        if(batch == null) return;

        this.FindAFreeServer();

        if (this.nextServer != null) this.AcceptBatch(batch);
    }

    GetCountOfServersDoingAJob(jobid: number): number {
        var count = 0;
        for (let server of this.servers) {
            for (let bat of server.processing) {
                if (bat.status == false && bat.jobid == jobid)
                    count++;
            }
        }
        return count;
    }
}

export interface IJob {
    id: number,
    batches: IBatch[],
    type: number
    // job has a type - S M L 
    // small takes priority
}

export interface IBatch {
    id: number,
    jobid: number,
    duration: number,
    status: boolean,
    startTime: Date,
    server:number
}

export interface IServer {
    id: number,
    processing: IBatch[]
}