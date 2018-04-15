Geom = {};
Geom.Point = function(_, $) {
    this.x = _;
    this.y = $
};
Geom.Line = function(B, $, A, _) {
    this.x1 = B;
    this.y1 = $;
    this.x2 = A;
    this.y2 = _
};
Geom.Line.prototype.getX1 = function() {
    return this.x1
};
Geom.Line.prototype.getX2 = function() {
    return this.x2
};
Geom.Line.prototype.getY1 = function() {
    return this.y1
};
Geom.Line.prototype.getY2 = function() {
    return this.y2
};
Geom.Line.prototype.getK = function() {
    return (this.y2 - this.y1) / (this.x2 - this.x1)
};
Geom.Line.prototype.getD = function() {
    return this.y1 - this.getK() * this.x1
};
Geom.Line.prototype.getDistance = function() {
    return Math.sqrt((this.x1 - this.x2) * (this.x1 - this.x2) + (this.y1 - this.y2) * (this.y1 - this.y2))
};
Geom.Line.prototype.isParallel = function($) {
    var A = this.x1,
    _ = this.x2;
    if ((Math.abs(A - _) < 0.01) && (Math.abs($.getX1() - $.getX2()) < 0.01)) return true;
    else if ((Math.abs(A - _) < 0.01) && (Math.abs($.getX1() - $.getX2()) > 0.01)) return false;
    else if ((Math.abs(A - _) > 0.01) && (Math.abs($.getX1() - $.getX2()) < 0.01)) return false;
    else return Math.abs(this.getK() - $.getK()) < 0.01
};
Geom.Line.prototype.isSameLine = function(_) {
    if (this.isParallel(_)) {
        var A = _.getK(),
        $ = _.getD();
        if (Math.abs(this.x1 * A + $ - this.y1) < 0.01) return true;
        else return false
    } else return false
};
Geom.Line.prototype.contains = function(B) {
    var H = this.x1,
    C = this.y1,
    E = this.x2,
    D = this.y2,
    G = B.x,
    F = B.y,
    A = (H - E) * (H - E) + (C - D) * (C - D),
    _ = (G - H) * (G - H) + (F - C) * (F - C),
    $ = (G - E) * (G - E) + (F - D) * (F - D);
    return A > _ && A > $
};
Geom.Line.prototype.getCrossPoint = function(B) {
    if (this.isParallel(B)) return null;
    var F, D;
    if (Math.abs(this.x1 - this.x2) < 0.01) {
        F = this.x1;
        D = B.getK() * F + B.getD()
    } else if (Math.abs(B.getX1() - B.getX2()) < 0.01) {
        F = B.getX1();
        D = this.getD()
    } else {
        var C = this.getK(),
        E = B.getK(),
        $ = this.getD(),
        _ = B.getD();
        F = (_ - $) / (C - E);
        D = C * F + $
    }
    var A = new Geom.Point(F, D);
    if (B.contains(A) && this.contains(A)) return A;
    else return null
};
Geom.Line.prototype.getPerpendicularDistance = function(L, K) {
    var J = new Geom.Point(L, K);
    if (this.x1 == this.x2) return this.contains(J) ? Math.abs(this.x1 - L) : 999;
    if (this.y1 == this.y2) return this.contains(J) ? Math.abs(this.y1 - K) : 999;
    var _ = this.getK(),
    A = -1 / _,
    E = K - A * L,
    I = new Geom.Line(L, K, 0, E),
    B = this.getK(),
    D = I.getK(),
    F = this.getD(),
    G = I.getD(),
    C = (G - F) / (B - D),
    $ = B * L + F,
    H = new Geom.Point(C, $);
    if (this.contains(H)) return new Geom.Line(L, K, C, $).getDistance();
    else return 999
};
Geom.Rect = function(B, A, $, _) {
    this.x = B;
    this.y = A;
    this.w = $;
    this.h = _
};
Geom.Rect.prototype.getCrossPoint = function(A) {
    var $ = null,
    D = new Geom.Line(this.x, this.y, this.x + this.w, this.y);
    $ = D.getCrossPoint(A);
    if ($ != null) return $;
    var _ = new Geom.Line(this.x, this.y + this.h, this.x + this.w, this.y + this.h);
    $ = _.getCrossPoint(A);
    if ($ != null) return $;
    var B = new Geom.Line(this.x, this.y, this.x, this.y + this.h);
    $ = B.getCrossPoint(A);
    if ($ != null) return $;
    var C = new Geom.Line(this.x + this.w, this.y, this.x + this.w, this.y + this.h);
    $ = C.getCrossPoint(A);
    return $
};

