# Generates the tutorial's background music: a mellow, modern lo-fi loop (electric piano, warm bass, soft beat), synthesised from scratch (no samples, no third-party music),
# so it is free of copyright and released CC0. Usage: python3 tools/make-tutorial-music.py video/audio/tutorial-music.wav [seconds]
import sys, numpy as np, wave
SR = 44100
out = sys.argv[1] if len(sys.argv) > 1 else "tutorial-music.wav"
dur = float(sys.argv[2]) if len(sys.argv) > 2 else 36.8
BPM = 78; beat = 60 / BPM; bar = 4 * beat
N = int(dur * SR); t = np.arange(N) / SR
mix = np.zeros(N); rs = np.random.RandomState(7)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
# Dm9 - Gm9 - Cmaj9 - Fmaj7 (ii-v-I-IV in C / F feel), voiced low and close
prog = [(38, [53, 57, 60, 64]), (43, [52, 58, 62, 65]), (36, [55, 59, 64, 67]), (41, [52, 57, 60, 64])]
def add(sig, start):
    i = int(start * SR); j = min(N, i + len(sig))
    if 0 <= i < N: mix[i:j] += sig[:j - i]
def keys(f, length, amp):                                          # soft electric piano: sine + tine, slow tremolo
    tt = np.arange(int(length * SR)) / SR
    s = np.sin(2*np.pi*f*tt) + .25*np.sin(2*np.pi*2*f*tt)*np.exp(-tt*6) + .08*np.sin(2*np.pi*4*f*tt)*np.exp(-tt*14)
    return amp * s * np.exp(-tt * 1.6) * np.minimum(1, tt / .012) * (1 + .12*np.sin(2*np.pi*4.5*tt))
def bass(f, length, amp):
    tt = np.arange(int(length * SR)) / SR
    return amp * (np.sin(2*np.pi*f*tt) + .2*np.sin(2*np.pi*2*f*tt)) * np.exp(-tt * 1.8) * np.minimum(1, tt / .01)
def kick(amp):
    tt = np.arange(int(.35 * SR)) / SR
    return amp * np.sin(2*np.pi*(48 + 90*np.exp(-tt*28))*tt) * np.exp(-tt * 9)
def hat(amp):
    tt = np.arange(int(.06 * SR)) / SR
    return amp * rs.randn(len(tt)) * np.exp(-tt * 70)
for b in range(int(dur / bar) + 1):
    root, ch = prog[b % 4]; st = b * bar
    for k, m in enumerate(ch):                                     # gently rolled chord on beat 1, echo on the "and" of 3
        add(keys(hz(m), bar * .95, .13), st + k * .025)
        if b % 2 == 1: add(keys(hz(m), beat * 2, .07), st + 2.5 * beat + k * .02)
    add(bass(hz(root), bar * .5, .34), st)
    add(bass(hz(root), beat * 1.5, .26), st + 2.5 * beat)
    add(kick(.30), st); add(kick(.22), st + 2.5 * beat)
    for k in range(8): add(hat(.045 if k % 2 == 0 else .03), st + k * beat / 2 + (.02 if k % 2 else 0))   # lazy swing
    if b % 4 == 3: add(keys(hz(ch[-1] + 12), beat * 2, .09), st + 3 * beat)                               # little turnaround note
# vinyl-style warmth: low-pass (one-pole x2) and a very quiet crackle
for _ in range(2):
    a = np.exp(-2*np.pi*3200/SR); y = np.zeros(N); z = 0.
    for i in range(N): z = (1-a)*mix[i] + a*z; y[i] = z
    mix = y
mix += .004 * (rs.rand(N) < .0008) * rs.randn(N) * 8
mix *= np.minimum(1, t / 1.5) * np.minimum(1, (dur - t) / 3)       # fade in 1.5 s, out 3 s
mix = np.tanh(mix * 1.5) * .6
with wave.open(out, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
