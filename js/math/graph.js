class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    addSegment(seg) {
        this.segments.push(seg);
    }
    tryAddSegment(seg) {
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
            this.addSegment(seg);
            return true;
        }
        return false;
    }
    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1);
    }
    containsSegment(seg) {
        return this.segments.find((s) => s.equals(seg));
    }
    getSegmentsWithPoint(point) {
        const segs = [];
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segs.push(seg)
            }
        }
        return segs;
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }



    addPoint(point) {
        this.points.push(point);
    }
    tryAddPoint(point) {
       if (!this.containsPoint(point)) {
        this.addPoint(point);
        return true;
       } 
       return false;
    }
    removePoint(point) {
        const segs = this.getSegmentsWithPoint(point);
        for (const seg of segs) {
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }
    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }




    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }


}