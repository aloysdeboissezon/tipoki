-- Profile picture (128 px JPEG data URL, ~5 KB) stored on the player row. Nullable: the app works without it.
alter table public.players add column if not exists avatar text check (avatar is null or length(avatar) <= 40000);
