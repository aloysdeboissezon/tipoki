# Generates the tutorial's background music: a short original loop, synthesised from scratch (no samples, no third-party music),
# so it is free of copyright and released CC0. Usage: python3 tools/make-tutorial-music.py video/audio/tutorial-music.wav [seconds]
import sys, numpy as np, wave
SR = 44100
out = sys.argv[1] if len(sys.argv) > 1 else "tutorial-music.wav"
dur = float(sys.argv[2]) if len(sys.argv) > 2 else 36.8
BPM = 104; beat = 60 / BPM
N = int(dur * SR); t = np.arange(N) / SR
mix = np.zeros(N)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
prog = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [48, 52, 55]), (55, [55, 59, 62])]   # Am F C G, one chord per bar
bar = 4 * beat
def add(sig, start):
    i = int(start * SR); j = min(N, i + len(sig))
    if i < N: mix[i:j] += sig[:j - i]
def pluck(f, length, amp):
    tt = np.arange(int(length * SR)) / SR
    s = np.sin(2*np.pi*f*tt) + .35*np.sin(2*np.pi*2*f*tt) + .12*np.sin(2*np.pi*3*f*tt)
    return amp * s * np.exp(-tt * 5.5) * np.minimum(1, tt / .004)
def pad(freqs, length, amp):
    tt = np.arange(int(length * SR)) / SR
    s = sum(np.sin(2*np.pi*f*tt) + .5*np.sin(2*np.pi*f*1.004*tt) for f in freqs)
    env = np.minimum(1, tt / .5) * np.minimum(1, (length - tt) / .6)
    return amp * s * env / len(freqs)
nbars = int(dur / bar) + 1
for b in range(nbars):
    root, ch = prog[b % 4]; s = b * bar
    add(pad([hz(m + 12) for m in ch], bar + .2, .20), s)
    add(pluck(hz(root - 12), bar * .9, .30), s)                    # bass
    for k in range(8):                                             # eighth-note arpeggio
        m = ch[[0, 1, 2, 1, 2, 1, 0, 1][k]] + 24
        add(pluck(hz(m), beat, .16 if k % 2 == 0 else .11), s + k * beat / 2)
    for k in range(4):                                             # soft tick on each beat
        tt = np.arange(int(.05 * SR)) / SR
        add(.05 * np.random.RandomState(b * 4 + k).randn(len(tt)) * np.exp(-tt * 90), s + k * beat + beat / 2 * (k % 2))
mix *= np.minimum(1, t / 1.0) * np.minimum(1, (dur - t) / 2.5)    # fade in 1 s, out 2.5 s
mix = np.tanh(mix * 1.4) * .55
with wave.open(out, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
