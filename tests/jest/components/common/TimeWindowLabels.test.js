// Copyright (c) 2020 Red Hat, Inc.
"use strict";

import React from "react";
import TimeWindowLabels from "../../../../src-web/components/common/TimeWindowLabels";
import renderer from "react-test-renderer";

describe("TimeWindowLabels", () => {
  it("renders as expected", () => {
    const component = renderer.create(
      <TimeWindowLabels
        timeWindow={{
          subName: "test-subscription-0",
          type: "active",
          days: ["Monday", "Tuesday"],
          timezone: "America/Toronto",
          ranges: [
            { end: "06:00PM", start: "08:00AM" },
            { end: "6:00AM", start: "12:00AM" }
          ]
        }}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});