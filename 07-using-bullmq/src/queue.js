import {Queue} from "bullmq";
const Connection={
  host: "localhost",
  port:6379

}
const emailQueue = new Queue("emails", {connection});
module.exports=
{ emailQueue
  ,Connection
};

