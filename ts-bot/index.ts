import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import * as process from 'process';

dotenv.config();

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
  })

  /*
  Modern Monday - posts between 1 year and 1 month ago
  Tech Tuesday?
  Words on Wednesday
  Throwback Thursday - blogspot posts older than 1 year ago
  Friday - WordPress post
  */

async function main() {
    await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!})
    const datetext = `The current date is ${Date()}`
    await agent.post({
        text: datetext
    });
    console.log("Just posted!")
}

// main(); //I think this runs it once, outside the cron job

async function sunday() {
    createPost("")
}

async function monday() {
    createPost("Modern Monday!")
}

async function tuesday() {
    createPost("")
}

async function wednesday() {
    createPost("Words on Wednesday!!")
}

async function thursday() {
    createPost("Throwback Thursday!!")
}

async function friday() {
    createPost("It's Friday!!")
}

async function saturday() {
    createPost("")
}

async function createPost(postText){
    await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!})
    await agent.post({
        text: postText
    });
    console.log("Just posted!")

}


// Run this on a cron job
const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
const scheduleExpression = '0 */3 * * *'; // Run once every three hours in prod
const wednesdayScheduleExpression = '30 8 * * 3'; // Run Wednesday at 8:30am
const fridayScheduleExpression = '30 9 * * 5'; // Run Friday at 9:30am

// const job = new CronJob(scheduleExpression, main); // change to scheduleExpressionMinute for testing
const wednesday_job = new CronJob(wednesdayScheduleExpression, wednesday);
const friday_job = new CronJob(fridayScheduleExpression, friday)

// job.start();
wednesday_job.start();
friday_job.start();