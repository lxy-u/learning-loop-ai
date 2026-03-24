import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    // 模拟返回的多步骤数据
    const mockResponse: Record<string, any> = {
      "什么是NPV": {
        knowledge: `
【知识点讲解】
净现值（NPV）是用来衡量一个投资项目在未来一定时期内的现金流入和现金流出，通过折现率折算到现在的净价值。

【举例说明】
比如，你现在投资一个项目，预计5年内可以每年带来1000元的收入，而项目成本是4000元。通过计算折现率，我们可以得出净现值NPV，若NPV大于0，说明这个项目可行。

【常见误区】
1. 忽视了折现率对NPV的影响。
2. 没有考虑通货膨胀。
        `,
        question: `以下哪个关于NPV的说法是正确？`,
        options: ["A：净现值为负说明项目不可行", "B：净现值为正说明项目不可行", "C：净现值为0时项目的回报率为0", "D：净现值的计算不需要考虑折现率"],
        correctAnswer: "A",
        explanation: `
【答案解析】
净现值（NPV）是用来衡量一个投资项目的回报。当净现值为负时，说明项目的回报不足，通常被视为不可行。
        `
      },
      // 可以增加更多问题
    };

    const result = mockResponse[input];

    if (!result) {
      return Response.json({
        knowledge: "暂时没有该问题的答案，试试其他问题！",
      });
    }

    return Response.json(result);

  } catch (error: any) {
    console.error("❌ ERROR:", error);
    return Response.json({
      knowledge: "出错了：" + error.message,
    });
  }
}