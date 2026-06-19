import {Worker} from 'bullmq';
import emailQueue from './queue.js';

const worker = new Worker(
  'emails',
  async (job) => {    console.log("Worker is running",job.id,job.name,job.data ),
  await new Promise((resolve) => setTimeout(resolve, 1500)),
  console.log("Job completed", job.id, job.name, job.data)  },
  {Connection}

);
worker.on('completed', (job) => {
  console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} has failed with ${err.message}`);
});
