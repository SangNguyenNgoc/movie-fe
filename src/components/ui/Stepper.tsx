import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

interface Step {
    id: number
    title: string
}

interface StepperProps {
    steps: Step[]
    currentStep: number
    className?: string
}

const Stepper = ({ steps, currentStep, className }: StepperProps) => {
    return (
        <div className={cn("w-full max-w-xl mx-auto", className)}>
            <div className="relative flex items-start">
                {steps.map((step, index) => {
                    const isCompleted = step.id < currentStep
                    const isCurrent = step.id === currentStep
                    const isUpcoming = step.id > currentStep

                    return (
                        <div key={step.id} className="flex-1 relative font-comfortaa">
                            <div className="flex flex-col items-center">
                                {/* Step Circle */}
                                <div
                                    className={
                                        "relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 " +
                                        (isCompleted || isCurrent
                                            ? "bg-primary text-label shadow-lg bg-opacity-80"
                                            : isUpcoming
                                                ? "bg-placeholder text-placeholder"
                                                : "")
                                    }
                                >
                                    {isCompleted ? (
                                        <Check className="w-3 h-3 stroke-[2.5]" />
                                    ) : (
                                        <span className=""></span>
                                    )}
                                </div>

                                {/* Step Title */}
                                <div className="mt-2 text-center max-w-[100px]">
                                    <p
                                        className={
                                            "text-sm font-medium leading-tight transition-colors duration-200 " +
                                            (isCompleted || isCurrent ? "text-primary" : isUpcoming ? "text-placeholder" : "")
                                        }
                                    >
                                        {step.title}
                                    </p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={
                                        "absolute top-3.5 left-1/2 w-full h-0.5 -translate-y-0.5 transition-colors duration-200 " +
                                        (isCompleted ? "bg-primary bg-opacity-80" : "bg-placeholder")
                                    }
                                    style={{
                                        marginLeft: "12px",
                                        width: "calc(100% - 24px)",
                                    }}
                                />
                            )}
                        </div>
                    );

                })}
            </div>
        </div>
    )
}

export default Stepper