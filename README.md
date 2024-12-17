# Color Overlap Investigator
When doing some HTML and CSS sometime ago, I was putting partially transparent divs over other ones and I was tring to get a desired color. 
Though I eventually gave up, it motivated me to try to fugre out a formula to calculate the effective color of a bunch of different layers stacked on top of each other.
I'm sure that the answer is out there somewhere, but I wanted to try to figure it out for myself.
So this project is a way to test my idea. You can choose the background color, and add layers of whatever color or alpha channel you wish, and it will calculate an effective color that should match.

### My Formula
My current idea is for layer 1 = `(r1, g1, b1, α1)` on top of layer 2 = `(r2, g2, b2, α2)` to result in `(r, g, b) = α1 * (r1, g1, b1) + α2 * (1-α1) * (r2, g2, b2)` and `α = 1 - (1 - α1)(1 - α2)`
