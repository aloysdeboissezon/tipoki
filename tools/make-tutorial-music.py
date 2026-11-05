# Generates the tutorial's background music: a punchy modern loop (four-on-the-floor kick, offbeat bass, claps, synth stabs and arpeggio), synthesised from scratch (no samples, no third-party music),
# so it is free of copyright and released CC0. Usage: python3 tools/make-tutorial-music.py video/audio/tutorial-music.wav [seconds]
import sys, numpy as np, wave
SR = 44100
out = sys.argv[1] if len(sys.argv) > 1 else "tutorial-music.wav"
dur = float(sys.argv[2]) if len(sys.argv) > 2 else 36.8
BPM = 118; beat = 60 / BPM; bar = 4 * beat
N = int(dur * SR); t = np.arange(N) / SR
mix = np.zeros(N); rs = np.random.RandomState(7)
def hz(m): return 440 * 2 ** ((m - 69) / 12)
# Am - F - C - G, one chord per bar
prog = [(45, [57, 60, 64]), (41, [57, 60, 65]), (48, [55, 60, 64]), (43, [55, 59, 62])]
def add(sig, start, g=None):
    i = int(start * SR); j = min(N, i + len(sig))
    if 0 <= i < N: mix[i:j] += sig[:j - i]
def saw(f, tt): return 2 * ((f * tt) % 1) - 1
def stab(freqs, length, amp):                                      # detuned saw chord, quick decay
    tt = np.arange(int(length * SR)) / SR
    s = sum(saw(f, tt) + saw(f * 1.007, tt) for f in freqs) / (2 * len(freqs))
    return amp * s * np.exp(-tt * 9) * np.minimum(1, tt / .003)
def bass(f, length, amp):
    tt = np.arange(int(length * SR)) / SR
    return amp * (np.sin(2*np.pi*f*tt) + .45*saw(f, tt)*np.exp(-tt*8)) * np.exp(-tt * 6) * np.minimum(1, tt / .004)
def pluck(f, amp):
    tt = np.arange(int(.22 * SR)) / SR
    return amp * (np.sin(2*np.pi*f*tt) + .4*np.sin(2*np.pi*2*f*tt)) * np.exp(-tt * 16) * np.minimum(1, tt / .002)
def kick(amp):
    tt = np.arange(int(.3 * SR)) / SR
    return amp * np.sin(2*np.pi*(45 + 110*np.exp(-tt*35))*tt) * np.exp(-tt * 10)
def clap(amp):
    tt = np.arange(int(.18 * SR)) / SR
    n = rs.randn(len(tt)); n = n - np.concatenate([[0], n[:-1]]) * .6
    return amp * n * (np.exp(-tt * 28) + .6*np.exp(-((tt-.012)*400)**2)*0)
def hat(amp, d=80):
    tt = np.arange(int(.05 * SR)) / SR
    n = rs.randn(len(tt)); n = n - np.concatenate([[0], n[:-1]])
    return amp * n * np.exp(-tt * d)
duck = np.ones(N)                                                  # sidechain pump on every kick
for b in range(int(dur / bar) + 1):
    root, ch = prog[b % 4]; st = b * bar
    for k in range(4):
        tk = st + k * beat; add(kick(.55), tk)
        i = int(tk * SR); j = min(N, i + int(.22 * SR))
        if i < N: duck[i:j] = np.minimum(duck[i:j], .35 + .65 * np.minimum(1, np.arange(j - i) / (.2 * SR)))
        add(bass(hz(root), beat * .5, .40), tk + beat / 2)         # offbeat bass
        add(hat(.10, 60), tk + beat / 2)                           # open-ish hat on the offbeat
        for q in (0, 2, 3): add(hat(.045, 140), tk + q * beat / 4)  # 16th ticks
        if k in (1, 3): add(clap(.16), tk)
    for pos in (0, 1.5, 2.5, 3):                                   # syncopated chord stabs
        add(stab([hz(m) for m in ch], beat, .16), st + pos * beat)
    if b >= 2:                                                     # 16th arpeggio from bar 3
        for k in range(16): add(pluck(hz(ch[[0,1,2,1][k % 4]] + 24), .07), st + k * beat / 4)
mix *= duck
mix *= np.minimum(1, t / .8) * np.minimum(1, (dur - t) / 2.5)
mix = np.tanh(mix * 1.8) * .7
with wave.open(out, "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
