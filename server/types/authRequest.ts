import { Request } from "express";
import { User } from "@supabase/supabase-js";

export interface AuthRequest<P = object> extends Request<P> {
  user: User;
}
